import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {Download,Loader2,Stethoscope} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../../../assets/images/logo.png";
import {getPatientSummary,getSignatures} from "../../../services/reportService";

import Watermark from "../../../assessments/components/resultSummary/Watermark";
import PatientReportHeader from "../../patientReportSummary/PatientReportHeader";
import PatientProfileCard from "../../patientReportSummary/PatientProfileCard";
import WellnessOverview from "../../patientReportSummary/WellnessOverview";
import RiskDomains from "../../patientReportSummary/RiskDomains";
import ClinicalAssessment from "../../patientReportSummary/ClinicalAssessment";
import LifestyleAssessment from "../../patientReportSummary/LifestyleAssessment";
import AyurvedaAssessment from "../../patientReportSummary/AyurvedaAssessment";
import PractitionerSection from "../../patientReportSummary/PractitionerSection";
import PatientReportFooter from "../../patientReportSummary/PatientReportFooter";
import LabReports from "../../../assessments/components/resultSummary/LabReports";

const M=12,H=20,F=12;

const value=v=>{
  if(v===null||v===undefined||v==="")return "--";
  if(Array.isArray(v))return v.length?v.map(value).join(", "):"--";
  if(typeof v==="object")return "--";
  return String(v);
};

const header=async(pdf,patient)=>{
  const w=pdf.internal.pageSize.getWidth();

  try{
    const img=new Image();
    img.src=logo;
    await new Promise(r=>{
      img.onload=r;
      img.onerror=r;
    });
    if(img.complete&&img.naturalWidth){
      const lw=34;
      const lh=img.naturalHeight/img.naturalWidth*lw;
      pdf.addImage(img,"PNG",M,5,lw,lh);
    }
  }catch(e){
    console.warn("PDF LOGO ERROR:",e);
  }

  pdf.setFont("helvetica","bold");
  pdf.setFontSize(12);
  pdf.setTextColor(23,60,104);
  pdf.text("DARSHAI Wellness Report",w-M,9,{align:"right"});

  pdf.setFont("helvetica","normal");
  pdf.setFontSize(7);
  pdf.setTextColor(100,116,139);
  pdf.text(`Patient: ${patient?.name||"--"}`,w-M,14,{align:"right"});

  pdf.setDrawColor(226,232,240);
  pdf.line(M,H,w-M,H);

  return H+9;
};

const space=(pdf,y,h=30)=>{
  const ph=pdf.internal.pageSize.getHeight();
  if(y+h>ph-F){
    pdf.addPage();
    return H+9;
  }
  return y;
};

const title=(pdf,text,y)=>{
  y=space(pdf,y,20);
  pdf.setFont("helvetica","bold");
  pdf.setFontSize(13);
  pdf.setTextColor(23,60,104);
  pdf.text(text,M,y);
  return y+7;
};

const table=(pdf,rows,y)=>{
  const w=pdf.internal.pageSize.getWidth();
  y=space(pdf,y,30);

  autoTable(pdf,{
    startY:y,
    margin:{left:M,right:M,top:H+6,bottom:F+8},
    tableWidth:w-M*2,
    theme:"grid",
    body:rows.map(([a,b])=>[value(a),value(b)]),
    styles:{
      font:"helvetica",
      fontSize:8,
      cellPadding:3.5,
      lineColor:[226,232,240],
      lineWidth:.2,
      textColor:[51,65,85],
      valign:"top",
      overflow:"linebreak"
    },
    columnStyles:{
      0:{
        cellWidth:52,
        fontStyle:"bold",
        fillColor:[248,250,252],
        textColor:[23,60,104]
      },
      1:{cellWidth:"auto"}
    }
  });

  return pdf.lastAutoTable.finalY+8;
};

const section= (pdf,text,rows,y)=>{
  const w=pdf.internal.pageSize.getWidth();

  y=space(pdf,y,40);

  pdf.setFillColor(248,250,252);
  pdf.setDrawColor(226,232,240);
  pdf.roundedRect(M,y,w-M*2,8,2,2,"FD");

  pdf.setFont("helvetica","bold");
  pdf.setFontSize(8.5);
  pdf.setTextColor(23,60,104);
  pdf.text(text,M+4,y+5.2);

  autoTable(pdf,{
    startY:y+10,
    margin:{left:M,right:M,top:H+6,bottom:F+8},
    tableWidth:w-M*2,
    theme:"grid",
    body:rows.map(([a,b])=>[value(a),value(b)]),
    styles:{
      font:"helvetica",
      fontSize:8,
      cellPadding:3.5,
      lineColor:[226,232,240],
      lineWidth:.2,
      textColor:[51,65,85],
      valign:"top",
      overflow:"linebreak"
    },
    columnStyles:{
      0:{
        cellWidth:52,
        fontStyle:"bold",
        fillColor:[248,250,252],
        textColor:[23,60,104]
      },
      1:{cellWidth:"auto"}
    }
  });

  return pdf.lastAutoTable.finalY+10;
};

const risks=(pdf,blocks,y)=>{
  if(!blocks?.length)return y;

  const w=pdf.internal.pageSize.getWidth();
  y=space(pdf,y,50);

  autoTable(pdf,{
    startY:y,
    margin:{left:M,right:M,top:H+6,bottom:F+8},
    tableWidth:w-M*2,
    theme:"grid",
    head:[["Risk Domain","Score","Risk Level","Critical"]],
    body:blocks.map(b=>[
      value(b?.title),
      b?.score!==undefined?`${b.score}%`:"--",
      value(b?.risk_level),
      b?.is_critical?"Yes":"No"
    ]),
    styles:{
      font:"helvetica",
      fontSize:7.5,
      cellPadding:3,
      lineColor:[226,232,240],
      lineWidth:.2,
      textColor:[51,65,85],
      valign:"middle"
    },
    headStyles:{
      fillColor:[23,60,104],
      textColor:[255,255,255],
      fontStyle:"bold"
    }
  });

  return pdf.lastAutoTable.finalY+10;
};

const doctorBox=async(pdf,notes,signature,y)=>{
  const w=pdf.internal.pageSize.getWidth();

  y=space(pdf,y,82);

  pdf.setFillColor(248,250,252);
  pdf.setDrawColor(203,213,225);
  pdf.roundedRect(M,y,w-M*2,70,3,3,"FD");

  pdf.setFont("helvetica","bold");
  pdf.setFontSize(11);
  pdf.setTextColor(23,60,104);
  pdf.text("Doctor Notes & Practitioner Signature",M+5,y+8);

  pdf.setDrawColor(226,232,240);
  pdf.line(M+5,y+11,w-M-5,y+11);

  pdf.setFontSize(8);
  pdf.text("Doctor Notes",M+5,y+18);

  pdf.setFont("helvetica","normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(51,65,85);

  const lines=pdf.splitTextToSize(
    value(notes),
    90
  );

  pdf.text(lines.slice(0,6),M+5,y+24);

  const sx=120;

  pdf.setFont("helvetica","bold");
  pdf.setFontSize(8);
  pdf.setTextColor(23,60,104);
  pdf.text("Practitioner Signature",sx,y+18);

  if(signature?.signature_url){
    try{
      const img=new Image();
      img.crossOrigin="anonymous";
      img.src=signature.signature_url;

      await new Promise(r=>{
        img.onload=r;
        img.onerror=r;
      });

      if(img.complete&&img.naturalWidth){
        const sw=45;
        const sh=Math.min(
          img.naturalHeight/img.naturalWidth*sw,
          22
        );

        pdf.addImage(
          img,
          "PNG",
          sx,
          y+21,
          sw,
          sh
        );
      }
    }catch(e){
      console.warn("SIGNATURE ERROR:",e);
    }
  }

  pdf.setFont("helvetica","bold");
  pdf.setFontSize(8);
  pdf.setTextColor(23,60,104);
  pdf.text(
    signature?.practitioner_name||"Practitioner",
    sx,
    y+51
  );

  pdf.setFont("helvetica","normal");
  pdf.setFontSize(7);
  pdf.setTextColor(100,116,139);
  pdf.text(
    signature?.designation||"Practitioner",
    sx,
    y+57
  );

  return y+78;
};

const footer=pdf=>{
  const pages=pdf.internal.getNumberOfPages();
  const w=pdf.internal.pageSize.getWidth();
  const h=pdf.internal.pageSize.getHeight();

  for(let i=1;i<=pages;i++){
    pdf.setPage(i);
    pdf.setFont("helvetica","normal");
    pdf.setFontSize(7);
    pdf.setTextColor(120,130,140);

    pdf.text("DarshAI Wellness Report",M,h-5);
    pdf.text(`Page ${i} of ${pages}`,w-M,h-5,{align:"right"});
  }
};

const PatientReportSummary=()=>{
  const {patientId}=useParams();

  const [report,setReport]=useState(null);
  const [loading,setLoading]=useState(true);
  const [downloading,setDownloading]=useState(false);

  const [practitionerNotes,setPractitionerNotes]=useState("");
  const [signatures,setSignatures]=useState([]);
  const [selectedSignature,setSelectedSignature]=useState(null);

  useEffect(()=>{
    loadSummary();
    loadSignatures();
  },[patientId]);

  const loadSummary=async()=>{
    try{
      const data=await getPatientSummary(patientId);
      console.log("PATIENT SUMMARY RESPONSE:",data);
      setReport(data);

      const p=data?.patient;

      setPractitionerNotes(
        p?.practitioner_notes||
        p?.doctor_notes||
        ""
      );

      if(p?.signature_url){
        setSelectedSignature({
          id:p?.practitioner_signature,
          practitioner_name:p?.practitioner_name,
          designation:p?.designation,
          signature_url:p?.signature_url
        });
      }
    }catch(error){
      console.error("PATIENT SUMMARY ERROR:",error);
    }finally{
      setLoading(false);
    }
  };

  const loadSignatures=async()=>{
    try{
      const data=await getSignatures();
      setSignatures(
        Array.isArray(data)
          ?data
          :data?.signatures||[]
      );
    }catch(error){
      console.error("SIGNATURE LOAD ERROR:",error);
    }
  };

  const downloadPDF=async()=>{
    if(!patient||downloading)return;

    setDownloading(true);

    try{
      const pdf=new jsPDF("p","mm","a4");
      let y=await header(pdf,patient);

      const ai=patient?.ai_response||{};

      /* PATIENT */

      y=title(pdf,"Patient Information",y);

      y=table(pdf,[
        ["Patient Name",patient?.name],
        ["Gender",patient?.gender],
        ["Status",patient?.status||"Active"],
        ["Email",patient?.email],
        ["Phone",patient?.phone],
        ["Location",patient?.location],
        ["Date of Birth",patient?.date_of_birth],
        ["Occupation",patient?.occupation]
      ],y);

      /* WELLNESS */

      y=title(pdf,"Wellness Overview",y);

      y=table(pdf,[
        ["Composite Score",ai?.composite_score],
        ["Risk Band",ai?.composite_risk||patient?.risk_band],
        [
          "Completion",
          ai?.total_completion_pct!==undefined
            ?`${ai.total_completion_pct}%`
            :"--"
        ],
        [
          "Assessment Status",
          patient?.assessment_status||"Completed"
        ]
      ],y);

      /* RISK */

      y=title(pdf,"Risk Domains",y);
      y=risks(pdf,ai?.blocks||[],y);

      /* CLINICAL */

      y=title(pdf,"Clinical Assessment",y);

      const clinical=
        patient?.clinical_answers||{};

      y=section(pdf,"Basic Clinical Information",[
        ["Height",clinical?.height],
        ["Libido",clinical?.libido],
        ["Hair / Skin",clinical?.hairSkin],
        ["Primary Goal",clinical?.primaryGoal]
      ],y);

      y=section(pdf,"Medical History",[
        ["Medical Conditions",clinical?.medicalConditions],
        ["Family History",clinical?.familyHistory],
        ["Medication Details",clinical?.medicationDetails]
      ],y);

      /* LIFESTYLE */

      y=title(pdf,"Lifestyle Assessment",y);

      const lifestyle=
        patient?.matrix_answers||{};

      const lifestyleRows=
        Object.entries(lifestyle)
          .filter(([,v])=>v!==null&&v!==undefined&&v!=="")
          .map(([k,v])=>[
            k.replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase()),
            v
          ]);

      y=section(
        pdf,
        "Lifestyle Preferences",
        lifestyleRows.length
          ?lifestyleRows
          :[["Lifestyle Data","No lifestyle data available."]],
        y
      );

      /* AYURVEDA */

      y=title(pdf,"Ayurveda Assessment",y);

      const ay=
        patient?.final_ayurveda_result||{};

      const prakriti=ay?.prakriti||{};
      const vikriti=ay?.vikriti||{};
      const agni=ay?.agni||{};
      const ama=ay?.ama||{};
      const correlation=ay?.correlation||{};

      y=section(pdf,"Prakriti & Dosha",[
        ["Prakriti Type",prakriti?.prakriti_type],
        ["Dominant Dosha",prakriti?.dominant_dosha],
        ["Risk Tier",ay?.risk_tier],
        ["Primary Dosha",ay?.primary_dosha],
        ["Primary Level",ay?.primary_level],
        ["Secondary Dosha",ay?.secondary_dosha],
        ["Secondary Level",ay?.secondary_level]
      ],y);

      y=section(pdf,"Dosha Distribution",[
        ["Vata",prakriti?.vata_pct!==undefined?`${prakriti.vata_pct}%`:"--"],
        ["Pitta",prakriti?.pitta_pct!==undefined?`${prakriti.pitta_pct}%`:"--"],
        ["Kapha",prakriti?.kapha_pct!==undefined?`${prakriti.kapha_pct}%`:"--"]
      ],y);

      const pattern=vikriti?.pattern||{};
      const dev=vikriti?.deviations||{};

      y=section(pdf,"Vikriti Analysis",[
        ["Pattern Type",pattern?.type],
        ["Pattern Description",pattern?.description],
        ["Dominant Doshas",pattern?.dominant_doshas],
        ["Current Vata %",vikriti?.vata_pct!==undefined?`${vikriti.vata_pct}%`:"--"],
        ["Current Pitta %",vikriti?.pitta_pct!==undefined?`${vikriti.pitta_pct}%`:"--"],
        ["Current Kapha %",vikriti?.kapha_pct!==undefined?`${vikriti.kapha_pct}%`:"--"]
      ],y);

      y=section(pdf,"Vikriti Deviations",[
        ["Vata Delta",dev?.Vata?.delta],
        ["Vata Level",dev?.Vata?.level],
        ["Vata Current",dev?.Vata?.current],
        ["Vata Baseline",dev?.Vata?.baseline],
        ["Pitta Delta",dev?.Pitta?.delta],
        ["Pitta Level",dev?.Pitta?.level],
        ["Pitta Current",dev?.Pitta?.current],
        ["Pitta Baseline",dev?.Pitta?.baseline],
        ["Kapha Delta",dev?.Kapha?.delta],
        ["Kapha Level",dev?.Kapha?.level],
        ["Kapha Current",dev?.Kapha?.current],
        ["Kapha Baseline",dev?.Kapha?.baseline]
      ],y);

      y=section(pdf,"Agni & Ama",[
        ["Agni Type",agni?.agni_type],
        ["Agni Meaning",agni?.clinical_meaning],
        ["Ama Severity",ama?.severity],
        ["Ama Percentage",ama?.percentage!==undefined?`${ama.percentage}%`:"--"]
      ],y);


      /* PRACTITIONER ASSESSMENT */

      y=title(pdf,"Practitioner Assessment",y);

      y=section(pdf,"Clinical Practitioner Assessment",[
        ["Primary Diagnosis",patient?.primary_diagnosis],
        ["Secondary Contributors",patient?.secondary_contributors],
        ["Dosha Imbalance",patient?.dosha_imbalance],
        ["Samprapti Stage",patient?.samprapti_stage],
        ["Root Cause",patient?.root_cause],
        ["Priority Intervention",patient?.priority_intervention],
        ["Protocol Tier",patient?.protocol_tier],
        ["Follow Up Timeline",patient?.follow_up_timeline]
      ],y);

      /*
       * EDITED DOCTOR NOTES + SIGNATURE
       * These values come from the webpage state.
       */

      y=await doctorBox(
        pdf,
        practitionerNotes,
        selectedSignature,
        y
      );

      /*
       * LAB REPORTS ARE NOT INCLUDED
       * IN THE DOWNLOADED PDF.
       */

      footer(pdf);

      pdf.save(
        `${patient?.name||"Patient"}_Complete_Wellness_Summary.pdf`
      );
    }catch(error){
      console.error(
        "PATIENT SUMMARY PDF ERROR:",
        error
      );
      alert("Unable to generate the complete patient summary.");
    }finally{
      setDownloading(false);
    }
  };

  if(loading){
    return(
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const patient=report?.patient;

  if(!patient){
    return(
      <div className="p-10 text-center text-slate-500">
        Patient report not found.
      </div>
    );
  }

  const labReports=
    report?.labReports||
    patient?.lab_reports||
    patient?.uploaded_reports||
    [];

  return(
    <div className="min-h-screen bg-slate-100 py-10">
      <Watermark/>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        <PatientReportHeader patient={patient}/>

        <PatientProfileCard patient={patient}/>

        <WellnessOverview patient={patient}/>

        <RiskDomains
          blocks={patient?.ai_response?.blocks||[]}
        />

        <ClinicalAssessment patient={patient}/>

        <LifestyleAssessment patient={patient}/>

        <AyurvedaAssessment patient={patient}/>

        <LabReports uploadedReports={labReports}/>

        <PractitionerSection patient={patient}/>

        <PatientReportFooter patient={patient}/>

        {/* DOCTOR NOTES + SIGNATURE EDITOR */}

        <div className="mt-10 bg-white rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Stethoscope
              size={22}
              className="text-[#1E7A3A]"
            />

            <h2 className="text-2xl font-semibold text-[#173C68]">
              Doctor's Notes
            </h2>
          </div>

          <div className="bg-white rounded-[24px] border p-6">
            <h3 className="text-xl font-bold text-[#173C68] mb-4">
              Practitioner Notes
            </h3>

            <textarea
              rows={12}
              value={practitionerNotes}
              onChange={e=>setPractitionerNotes(e.target.value)}
              placeholder="Enter practitioner notes..."
              className="w-full rounded-[20px] border border-slate-200 p-5 text-[15px] font-medium text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#173C68] bg-[#F8FAFC]"
            />
          </div>

          <div className="mt-10 pt-8 border-t">
            <h3 className="text-lg font-bold text-[#173C68] mb-5">
              Practitioner Signature
            </h3>

            <select
              value={selectedSignature?.id||""}
              onChange={e=>{
                setSelectedSignature(
                  signatures.find(
                    item=>String(item.id)===e.target.value
                  )||null
                );
              }}
              className="w-full sm:w-auto p-4 border rounded-2xl bg-white"
            >
              <option value="">
                Select Practitioner
              </option>

              {signatures.map(item=>(
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.practitioner_name}
                </option>
              ))}
            </select>

            {selectedSignature&&(
              <div className="mt-5 rounded-[24px] border p-6 bg-[#F8FAFC]">
                <img
                  src={selectedSignature.signature_url}
                  alt="Practitioner Signature"
                  className="h-24 object-contain"
                />

                <h3 className="font-bold text-[#173C68] mt-4">
                  {selectedSignature.practitioner_name}
                </h3>

                <p className="text-slate-500">
                  {selectedSignature.designation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* DOWNLOAD BUTTON AT VERY BOTTOM */}

        <div className="flex justify-center mt-10 pb-10">
          <button
            type="button"
            onClick={downloadPDF}
            disabled={downloading}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1E7A3A] text-white font-semibold shadow-lg hover:bg-[#17632F] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {downloading
              ?<Loader2 size={20} className="animate-spin"/>
              :<Download size={20}/>
            }

            {downloading
              ?"Generating Report..."
              :"Download Complete Report"
            }
          </button>
        </div>

      </div>
    </div>
  );
};

export default PatientReportSummary;