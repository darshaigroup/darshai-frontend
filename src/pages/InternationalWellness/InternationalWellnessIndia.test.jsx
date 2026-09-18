import {describe,it,expect,beforeEach,vi} from "vitest";
import {render,screen,waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import InternationalWellnessIndia from "./InternationalWellnessIndia";

describe("InternationalWellnessIndia - Concierge Form",()=>{
  beforeEach(()=>{
    vi.restoreAllMocks();
  });

  const renderPage=()=>render(
    <MemoryRouter>
      <InternationalWellnessIndia/>
    </MemoryRouter>
  );

  const getFields=()=>{
    const name=screen.getByPlaceholderText("e.g. Alistair Sterling");
    const email=screen.getByPlaceholderText("e.g. alistair@example.com");
    const phone=screen.getByPlaceholderText("98765 43210");
    const message=screen.getByPlaceholderText("Share any questions, preferred dates, or personal preferences...");
    const interest=screen.getByRole("combobox",{name:/what are you interested in/i});
    return {name,email,phone,message,interest};
  };

  const fillRequiredFields=async()=>{
    const user=userEvent.setup();
    renderPage();
    const {name,email,phone,message,interest}=getFields();

    await user.type(name,"John Smith");
    await user.type(email,"john@example.com");
    await user.type(phone,"9876543210");
    await user.selectOptions(interest,"Executive Wellness");
    await user.type(message,"I am interested in a wellness programme.");

    return user;
  };

  it("renders the concierge form",()=>{
    renderPage();

    expect(screen.getByText("START YOUR JOURNEY")).toBeInTheDocument();
    expect(screen.getByText("Tell Us What You’re Looking For.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. Alistair Sterling")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. alistair@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("98765 43210")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Share any questions, preferred dates, or personal preferences...")).toBeInTheDocument();
    expect(screen.getByRole("button",{name:/start your journey/i})).toBeInTheDocument();
  });

  it("renders India as the default country of residence",()=>{
    renderPage();

    expect(screen.getByText("India",{selector:"*"})).toBeInTheDocument();
  });

  it("uses Executive Wellness as the default interest",()=>{
    renderPage();

    const interest=screen.getByRole("combobox",{name:/what are you interested in/i});
    expect(interest).toHaveValue("Executive Wellness");
  });

  it("prevents submission when required fields are empty",async()=>{
    const user=userEvent.setup();
    renderPage();

    const submit=screen.getByRole("button",{name:/start your journey/i});
    await user.click(submit);

    expect(screen.getByText("Please complete all required fields")).toBeInTheDocument();
  });

  it("prevents submission when the name is empty",async()=>{
    const user=userEvent.setup();
    renderPage();

    const {email,phone,message,interest}=getFields();

    await user.type(email,"john@example.com");
    await user.type(phone,"9876543210");
    await user.selectOptions(interest,"Executive Wellness");
    await user.type(message,"I need help choosing a programme.");

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(screen.getByText("Please complete all required fields")).toBeInTheDocument();
  });

  it("prevents submission when the email is empty",async()=>{
    const user=userEvent.setup();
    renderPage();

    const {name,phone,message,interest}=getFields();

    await user.type(name,"John Smith");
    await user.type(phone,"9876543210");
    await user.selectOptions(interest,"Executive Wellness");
    await user.type(message,"I need help choosing a programme.");

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(screen.getByText("Please complete all required fields")).toBeInTheDocument();
  });

  it("rejects an invalid email address",async()=>{
    const user=userEvent.setup();
    renderPage();

    const {name,email,phone,message,interest}=getFields();

    await user.type(name,"John Smith");
    await user.type(email,"invalid-email");
    await user.type(phone,"9876543210");
    await user.selectOptions(interest,"Executive Wellness");
    await user.type(message,"I need help choosing a programme.");

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(email).toBeInvalid();
  });

  it("prevents submission when the phone number is empty",async()=>{
    const user=userEvent.setup();
    renderPage();

    const {name,email,message,interest}=getFields();

    await user.type(name,"John Smith");
    await user.type(email,"john@example.com");
    await user.selectOptions(interest,"Executive Wellness");
    await user.type(message,"I need help choosing a programme.");

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(screen.getByText("Please complete all required fields")).toBeInTheDocument();
  });

  it("prevents submission when the message is empty",async()=>{
    const user=userEvent.setup();
    renderPage();

    const {name,email,phone,interest}=getFields();

    await user.type(name,"John Smith");
    await user.type(email,"john@example.com");
    await user.type(phone,"9876543210");
    await user.selectOptions(interest,"Executive Wellness");

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(screen.getByText("Please complete all required fields")).toBeInTheDocument();
  });

  it("accepts user input in the form fields",async()=>{
    const user=userEvent.setup();
    renderPage();

    const {name,email,phone,message,interest}=getFields();

    await user.type(name,"John Smith");
    await user.type(email,"john@example.com");
    await user.type(phone,"9876543210");
    await user.selectOptions(interest,"Ayurveda Wellness");
    await user.type(message,"I am looking for a 14 day programme.");

    expect(name).toHaveValue("John Smith");
    expect(email).toHaveValue("john@example.com");
    expect(phone).toHaveValue(expect.stringContaining("9876543210"));
    expect(interest).toHaveValue("Ayurveda Wellness");
    expect(message).toHaveValue("I am looking for a 14 day programme.");
  });

  it("submits the correct API payload",async()=>{
    const user=await fillRequiredFields();

    const fetchMock=vi.spyOn(global,"fetch").mockResolvedValue({
      ok:true,
      json:async()=>({success:true,message:"Inquiry submitted successfully!"})
    });

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    await waitFor(()=>expect(fetchMock).toHaveBeenCalled());

    const [url,options]=fetchMock.mock.calls[0];
    const payload=JSON.parse(options.body);

    expect(url).toBe("http://localhost:5000/api/query/create");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({"Content-Type":"application/json"});
    expect(payload).toEqual({
      name:"John Smith",
      email:"john@example.com",
      phone:expect.stringContaining("+"),
      location:"India",
      interest:"Executive Wellness",
      message:"I am interested in a wellness programme."
    });
  });

  it("trims whitespace before submitting",async()=>{
    const user=userEvent.setup();
    renderPage();

    const {name,email,phone,message,interest}=getFields();

    await user.type(name,"  John Smith  ");
    await user.type(email,"  john@example.com  ");
    await user.type(phone,"9876543210");
    await user.selectOptions(interest,"Executive Wellness");
    await user.type(message,"  I want a wellness programme.  ");

    const fetchMock=vi.spyOn(global,"fetch").mockResolvedValue({
      ok:true,
      json:async()=>({success:true})
    });

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    await waitFor(()=>expect(fetchMock).toHaveBeenCalled());

    const payload=JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(payload.name).toBe("John Smith");
    expect(payload.email).toBe("john@example.com");
    expect(payload.message).toBe("I want a wellness programme.");
  });

  it("shows sending state while the request is pending",async()=>{
    const user=await fillRequiredFields();

    let resolveRequest;

    const fetchMock=vi.spyOn(global,"fetch").mockImplementation(()=>new Promise(resolve=>{
      resolveRequest=resolve;
    }));

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(screen.getByRole("button",{name:/sending/i})).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveRequest({
      ok:true,
      json:async()=>({success:true})
    });

    await waitFor(()=>expect(screen.getByText("Your Journey Request Has Been Received.")).toBeInTheDocument());
  });

  it("shows success screen after successful submission",async()=>{
    const user=await fillRequiredFields();

    vi.spyOn(global,"fetch").mockResolvedValue({
      ok:true,
      json:async()=>({
        success:true,
        message:"Inquiry submitted successfully!"
      })
    });

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(await screen.findByText("Your Journey Request Has Been Received.")).toBeInTheDocument();
    expect(screen.getByText(/Thank you for reaching out to DARSHAI/i)).toBeInTheDocument();
    expect(screen.getByText(/within 24 hours/i)).toBeInTheDocument();
  });

  it("does not display submitted personal information on the success screen",async()=>{
    const user=await fillRequiredFields();

    vi.spyOn(global,"fetch").mockResolvedValue({
      ok:true,
      json:async()=>({success:true})
    });

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(await screen.findByText("Your Journey Request Has Been Received.")).toBeInTheDocument();
    expect(screen.queryByText("John Smith")).not.toBeInTheDocument();
    expect(screen.queryByText("john@example.com")).not.toBeInTheDocument();
    expect(screen.queryByText("I am interested in a wellness programme.")).not.toBeInTheDocument();
  });

  it("shows backend error when API returns an error",async()=>{
    const user=await fillRequiredFields();

    vi.spyOn(global,"fetch").mockResolvedValue({
      ok:false,
      status:500,
      json:async()=>({message:"Failed to send inquiry"})
    });

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(await screen.findByText("Failed to send inquiry")).toBeInTheDocument();
    expect(screen.queryByText("Your Journey Request Has Been Received.")).not.toBeInTheDocument();
  });

  it("shows API validation error returned by the backend",async()=>{
    const user=await fillRequiredFields();

    vi.spyOn(global,"fetch").mockResolvedValue({
      ok:false,
      status:400,
      json:async()=>({message:"Required fields missing"})
    });

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(await screen.findByText("Required fields missing")).toBeInTheDocument();
  });

  it("handles network failure",async()=>{
    const user=await fillRequiredFields();

    vi.spyOn(global,"fetch").mockRejectedValue(new Error("Network error"));

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });

  it("does not show the success screen when submission fails",async()=>{
    const user=await fillRequiredFields();

    vi.spyOn(global,"fetch").mockRejectedValue(new Error("Server unavailable"));

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(await screen.findByText("Server unavailable")).toBeInTheDocument();
    expect(screen.queryByText("Your Journey Request Has Been Received.")).not.toBeInTheDocument();
  });

  it("prevents duplicate submission while loading",async()=>{
    const user=await fillRequiredFields();

    let resolveRequest;

    const fetchMock=vi.spyOn(global,"fetch").mockImplementation(()=>new Promise(resolve=>{
      resolveRequest=resolve;
    }));

    const button=screen.getByRole("button",{name:/start your journey/i});

    await user.click(button);
    expect(button).toBeDisabled();

    await user.click(button);

    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveRequest({
      ok:true,
      json:async()=>({success:true})
    });

    await waitFor(()=>expect(screen.getByText("Your Journey Request Has Been Received.")).toBeInTheDocument());
  });

  it("uses initialGoal as the selected interest",()=>{
    renderPage();

    const interest=screen.getByRole("combobox",{name:/what are you interested in/i});

    expect(interest).toHaveValue("Executive Wellness");
  });

  it("allows selecting a different wellness interest",async()=>{
    const user=userEvent.setup();
    renderPage();

    const interest=screen.getByRole("combobox",{name:/what are you interested in/i});

    await user.selectOptions(interest,"Stress & Burnout Recovery");

    expect(interest).toHaveValue("Stress & Burnout Recovery");
  });

  it("resets the form after successful submission",async()=>{
    const user=await fillRequiredFields();

    vi.spyOn(global,"fetch").mockResolvedValue({
      ok:true,
      json:async()=>({success:true})
    });

    await user.click(screen.getByRole("button",{name:/start your journey/i}));

    expect(await screen.findByText("Your Journey Request Has Been Received.")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("e.g. Alistair Sterling")).not.toBeInTheDocument();
  });
});