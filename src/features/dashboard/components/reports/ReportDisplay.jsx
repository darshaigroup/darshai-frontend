import {useEffect,useState} from "react";
import {useLocation,useNavigate,useParams} from "react-router-dom";
import {ArrowLeft,User,FileText,Stethoscope} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../../assets/images/logo.png";
import {getPatientReport,getSignatures} from "../../services/reportService";

const API_URL=import.meta.env.VITE_API_URL;
const PDF_MARGIN=12;

const ReportDisplay=()=>{
  const navigate=useNavigate();
  const location=useLocation();
  const {patientId}=useParams();
  const reportType=location.state?.reportType||"risk";

  const [loading,setLoading]=useState(true);
  const [patient,setPatient]=useState(null);
  const [labReports,setLabReports]=useState([]);
  const [labReportUrls,setLabReportUrls]=useState({});
  const [signatures,setSignatures]=useState([]);
  const [selectedSignature,setSelectedSignature]=useState(null);
  const [practitionerNotes,setPractitionerNotes]=useState("");

  useEffect(()=>{
    fetchPatientReport();
    loadSignatures();
  },[patientId]);

  useEffect(()=>{
    if(!labReports.length||reportType!=="clinical")return;

    let active=true;
    const urls=[];

    const loadLabReports=async()=>{
      try{
        const token=
          localStorage.getItem("token")||
          localStorage.getItem("accessToken");

        if(!token)throw new Error("Authentication token not found");

        const results=await Promise.all(
          labReports.map(async report=>{
            const response=await fetch(
              `${API_URL}/api/lab-reports/${report.id}/view`,
              {headers:{Authorization:`Bearer ${token}`}}
            );

            if(!response.ok){
              throw new Error(
                `Unable to load ${report.report_name}`
              );
            }

            const blob=await response.blob();
            const url=URL.createObjectURL(
              new Blob([blob],{type:"application/pdf"})
            );

            urls.push(url);
            return [report.id,url];
          })
        );

        if(active){
          setLabReportUrls(
            Object.fromEntries(results)
          );
        }
      }catch(error){
        console.error(
          "LAB REPORT VIEW ERROR:",
          error
        );
      }
    };

    loadLabReports();

    return()=>{
      active=false;
      urls.forEach(url=>URL.revokeObjectURL(url));
    };
  },[labReports,reportType]);

  const fetchPatientReport=async()=>{
    try{
      const data=await getPatientReport(patientId);
      setPatient(data.patient);
      setLabReports(data.labReports||[]);
    }catch(error){
      console.error(
        "PATIENT REPORT ERROR:",
        error
      );
    }finally{
      setLoading(false);
    }
  };

  const loadSignatures=async()=>{
    try{
      setSignatures(
        (await getSignatures())||[]
      );
    }catch(error){
      console.error(
        "SIGNATURE ERROR:",
        error
      );
    }
  };

  const cleanValue=value=>{
    if(Array.isArray(value)){
      return value.length
        ?value.join(", ")
        :"-";
    }

    if(
      value===undefined||
      value===null||
      value===""
    ){
      return "-";
    }

    return String(value);
  };

  const imageToDataURL=async url=>{
    if(!url)return null;

    try{
      const response=await fetch(url);

      if(!response.ok){
        throw new Error(
          "Unable to fetch image"
        );
      }

      const blob=await response.blob();

      return await new Promise(
        (resolve,reject)=>{
          const reader=new FileReader();

          reader.onloadend=()=>{
            resolve(reader.result);
          };

          reader.onerror=reject;
          reader.readAsDataURL(blob);
        }
      );
    }catch(error){
      console.warn(
        "IMAGE CONVERSION ERROR:",
        error
      );
      return null;
    }
  };

  /* PDF HEADER */
  const addPDFHeader=async(pdf,title)=>{
    const width=
      pdf.internal.pageSize.getWidth();

    const logoData=
      await imageToDataURL(logo);

    if(logoData){
      try{
        pdf.addImage(
          logoData,
          "PNG",
          PDF_MARGIN,
          10,
          42,
          16
        );
      }catch(error){
        console.warn(
          "LOGO PDF ERROR:",
          error
        );
      }
    }

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(18);
    pdf.setTextColor(
      23,
      60,
      104
    );

    pdf.text(
      title,
      PDF_MARGIN,
      35
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(9);
    pdf.setTextColor(
      100,
      116,
      139
    );

    pdf.text(
      `Generated on ${new Date().toLocaleDateString("en-GB")}`,
      PDF_MARGIN,
      42
    );

    pdf.setDrawColor(
      30,
      122,
      58
    );

    pdf.setLineWidth(0.6);

    pdf.line(
      PDF_MARGIN,
      47,
      width-PDF_MARGIN,
      47
    );

    return 55;
  };

  /* PDF SECTION TITLE */
  const addTitle=(pdf,title,y)=>{
    const width=
      pdf.internal.pageSize.getWidth();

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(14);

    pdf.setTextColor(
      23,
      60,
      104
    );

    pdf.text(
      title,
      PDF_MARGIN,
      y
    );

    pdf.setDrawColor(
      30,
      122,
      58
    );

    pdf.setLineWidth(0.5);

    pdf.line(
      PDF_MARGIN,
      y+3,
      width-PDF_MARGIN,
      y+3
    );

    return y+10;
  };

  /* NORMAL PDF TABLE */
  const getTableMargin=()=>({
    left:PDF_MARGIN,
    right:PDF_MARGIN,
    top:10,
    bottom:PDF_MARGIN,
  });

  /* KEY VALUE TABLE */
  const addKeyValueTable=(
    pdf,
    rows,
    columns=3,
    y
  )=>{
    const width=
      pdf.internal.pageSize.getWidth()-
      PDF_MARGIN*2;

    const body=[];

    for(
      let i=0;
      i<rows.length;
      i+=columns
    ){
      const row=[];

      for(
        let j=0;
        j<columns;
        j++
      ){
        const item=rows[i+j];

        row.push(
          item?.[0]||""
        );

        row.push(
          item?.[1]===undefined
            ?""
            :cleanValue(item[1])
        );
      }

      body.push(row);
    }

    autoTable(pdf,{
      startY:y,
      margin:getTableMargin(),
      tableWidth:width,
      theme:"grid",
      styles:{
        font:"helvetica",
        fontSize:9,
        cellPadding:4,
        textColor:[
          51,
          65,
          85
        ],
        lineColor:[
          226,
          232,
          240
        ],
        lineWidth:0.2,
        valign:"middle",
      },
      columnStyles:{
        0:{
          fontStyle:"bold",
          textColor:[
            100,
            116,
            139
          ],
          fillColor:[
            248,
            250,
            252
          ],
        },
        2:{
          fontStyle:"bold",
          textColor:[
            100,
            116,
            139
          ],
          fillColor:[
            248,
            250,
            252
          ],
        },
        4:{
          fontStyle:"bold",
          textColor:[
            100,
            116,
            139
          ],
          fillColor:[
            248,
            250,
            252
          ],
        },
      },
      body,
    });

    return pdf.lastAutoTable.finalY+7;
  };

  /* FULL WIDTH TABLE */
  const addFullWidthTable=(
    pdf,
    rows,
    y
  )=>{
    const width=
      pdf.internal.pageSize.getWidth()-
      PDF_MARGIN*2;

    autoTable(pdf,{
      startY:y,
      margin:getTableMargin(),
      tableWidth:width,
      theme:"grid",
      styles:{
        font:"helvetica",
        fontSize:9,
        cellPadding:5,
        textColor:[
          51,
          65,
          85
        ],
        lineColor:[
          226,
          232,
          240
        ],
        lineWidth:0.2,
        valign:"top",
      },
      columnStyles:{
        0:{
          cellWidth:45,
          fontStyle:"bold",
          textColor:[
            100,
            116,
            139
          ],
          fillColor:[
            248,
            250,
            252
          ],
        },
        1:{
          cellWidth:width-45,
        },
      },
      body:rows.map(
        ([label,value])=>[
          label,
          cleanValue(value),
        ]
      ),
    });

    return pdf.lastAutoTable.finalY+7;
  };

  /* RISK TABLE */
  const addRiskTable=(
    pdf,
    blocks,
    y
  )=>{
    if(!blocks.length)return y;

    autoTable(pdf,{
      startY:y,
      margin:getTableMargin(),
      theme:"grid",
      styles:{
        font:"helvetica",
        fontSize:9,
        cellPadding:5,
        lineColor:[
          226,
          232,
          240
        ],
        textColor:[
          51,
          65,
          85
        ],
        valign:"top",
      },
      headStyles:{
        fillColor:[
          23,
          60,
          104
        ],
        textColor:[
          255,
          255,
          255
        ],
        fontStyle:"bold",
      },
      head:[
        [
          "Assessment",
          "Risk Level",
          "Score",
        ],
      ],
      body:blocks.map(
        block=>[
          block.title||"-",
          block.risk_level||"-",
          `${block.score||0}%`,
        ]
      ),
    });

    return pdf.lastAutoTable.finalY+8;
  };

  /*
   * DOWNLOAD PDF
   *
   * Doctor notes and practitioner
   * signature are intentionally NOT
   * included in the PDF.
   */
  const downloadPDF=async()=>{
    try{
      if(!patient)return;

      const pdf=new jsPDF(
        "p",
        "mm",
        "a4"
      );

      let y=await addPDFHeader(
        pdf,
        reportTitle[reportType]||
          "Wellness Report"
      );

      /* PATIENT INFORMATION */
      y=addTitle(
        pdf,
        "Patient Information",
        y
      );

      y=addKeyValueTable(
        pdf,
        [
          [
            "Patient Name",
            patient?.name,
          ],
          [
            "Gender",
            patient?.gender,
          ],
          [
            "Status",
            "Active",
          ],
          [
            "Email",
            patient?.email,
          ],
          [
            "Phone",
            patient?.phone,
          ],
          [
            "Location",
            patient?.location,
          ],
        ],
        3,
        y
      );

      /* RISK */
      if(reportType==="risk"){
        y=addTitle(
          pdf,
          "Risk Assessment",
          y
        );

        const ai=
          patient?.ai_response||{};

        y=addKeyValueTable(
          pdf,
          [
            [
              "Composite Score",
              ai.composite_score,
            ],
            [
              "Risk Band",
              ai.composite_risk,
            ],
            [
              "Completion",
              `${ai.total_completion_pct||0}%`,
            ],
          ],
          3,
          y
        );

        y=addRiskTable(
          pdf,
          ai.blocks||[],
          y
        );
      }

      /* AYURVEDA */
      if(reportType==="ayurveda"){
        y=addTitle(
          pdf,
          "Ayurveda Assessment",
          y
        );

        const ayurveda=
          patient?.final_ayurveda_result||{};

        const prakriti=
          ayurveda.prakriti||{};

        const agni=
          ayurveda.agni||{};

        const ama=
          ayurveda.ama||{};

        y=addKeyValueTable(
          pdf,
          [
            [
              "Prakriti Type",
              prakriti.prakriti_type,
            ],
            [
              "Dominant Dosha",
              prakriti.dominant_dosha,
            ],
            [
              "Risk Tier",
              ayurveda.risk_tier,
            ],
          ],
          3,
          y
        );

        y=addKeyValueTable(
          pdf,
          [
            [
              "Vata %",
              prakriti.vata_pct!==undefined
                ?`${prakriti.vata_pct}%`
                :"0%",
            ],
            [
              "Pitta %",
              prakriti.pitta_pct!==undefined
                ?`${prakriti.pitta_pct}%`
                :"0%",
            ],
            [
              "Kapha %",
              prakriti.kapha_pct!==undefined
                ?`${prakriti.kapha_pct}%`
                :"0%",
            ],
          ],
          3,
          y
        );

        y=addKeyValueTable(
          pdf,
          [
            [
              "Primary Dosha",
              ayurveda.primary_dosha,
            ],
            [
              "Primary Level",
              ayurveda.primary_level,
            ],
            [
              "Secondary Dosha",
              ayurveda.secondary_dosha,
            ],
            [
              "Secondary Level",
              ayurveda.secondary_level,
            ],
          ],
          2,
          y
        );

        y=addFullWidthTable(
          pdf,
          [
            [
              "Agni Type",
              agni.agni_type,
            ],
            [
              "Agni Meaning",
              agni.clinical_meaning,
            ],
            [
              "Ama Severity",
              ama.severity,
            ],
            [
              "Ama Percentage",
              ama.percentage,
            ],
          ],
          y
        );
      }

      /* CLINICAL */
      if(reportType==="clinical"){
        const clinical=
          patient?.clinical_answers||{};

        y=addTitle(
          pdf,
          "Clinical Assessment",
          y
        );

        y=addKeyValueTable(
          pdf,
          [
            [
              "Height",
              clinical.height,
            ],
            [
              "Libido",
              clinical.libido,
            ],
            [
              "Hair / Skin",
              clinical.hairSkin,
            ],
            [
              "Primary Goal",
              clinical.primaryGoal,
            ],
          ],
          4,
          y
        );

        y=addKeyValueTable(
          pdf,
          [
            [
              "Medical Conditions",
              clinical.medicalConditions,
            ],
            [
              "Family History",
              clinical.familyHistory,
            ],
          ],
          2,
          y
        );

        y=addFullWidthTable(
          pdf,
          [
            [
              "Medication Details",
              clinical.medicationDetails,
            ],
          ],
          y
        );

        /*
         * Clinical practitioner information
         * remains in the report.
         *
         * Doctor Notes and Signature are
         * intentionally excluded.
         */
        y=addTitle(
          pdf,
          "Practitioner Assessment",
          y
        );

        y=addFullWidthTable(
          pdf,
          [
            [
              "Primary Diagnosis",
              patient?.primary_diagnosis,
            ],
            [
              "Secondary Contributors",
              patient?.secondary_contributors,
            ],
            [
              "Dosha Imbalance",
              patient?.dosha_imbalance,
            ],
            [
              "Samprapti Stage",
              patient?.samprapti_stage,
            ],
            [
              "Root Cause",
              patient?.root_cause,
            ],
            [
              "Priority Intervention",
              patient?.priority_intervention,
            ],
            [
              "Protocol Tier",
              patient?.protocol_tier,
            ],
            [
              "Follow Up Timeline",
              patient?.follow_up_timeline,
            ],
          ],
          y
        );
      }

      /* LIFESTYLE */
      if(reportType==="lifestyle"){
        y=addTitle(
          pdf,
          "Lifestyle Matrix",
          y
        );

        const answers=
          patient?.matrix_answers||{};

        y=addFullWidthTable(
          pdf,
          Object.entries(
            answers
          ).map(([key,value])=>[
            key.replaceAll(
              "_",
              " "
            ),
            value,
          ]),
          y
        );
      }

      /*
       * NO DOCTOR FOOTER
       * NO SIGNATURE
       * NO PRACTITIONER NOTES
       *
       * PDF ends with report content.
       */
      pdf.save(
        `${patient?.name||"Patient"}_${reportType}_Report.pdf`
      );
    }catch(error){
      console.error(
        "PDF DOWNLOAD ERROR:",
        error
      );
    }
  };

  const reportTitle={
    risk:"Risk Assessment",
    ayurveda:"Ayurveda Assessment",
    clinical:"Clinical Assessment",
    lifestyle:"Lifestyle Matrix",
  };

  const renderReportContent=()=>{
    switch(reportType){
      case "risk":{
        const ai=
          patient?.ai_response||{};

        return(
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-5">
              <MetricCard
                label="Composite Score"
                value={ai.composite_score}
              />

              <MetricCard
                label="Risk Band"
                value={ai.composite_risk}
              />

              <MetricCard
                label="Completion"
                value={`${ai.total_completion_pct||0}%`}
              />
            </div>

            <div className="space-y-4">
              {(ai.blocks||[]).map(
                block=>(
                  <div
                    key={block.id}
                    className="rounded-[24px] border p-5 bg-white"
                  >
                    <div className="flex justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {block.title}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Risk Band :{" "}
                          {block.risk_level}
                        </p>
                      </div>

                      <span className="font-semibold">
                        {block.score}%
                      </span>
                    </div>

                    <div className="w-full h-3 bg-slate-200 rounded-full">
                      <div
                        className={`h-3 rounded-full ${
                          block.risk_level==="High"
                            ?"bg-red-500"
                            :block.risk_level==="Moderate"
                              ?"bg-amber-500"
                              :"bg-green-500"
                        }`}
                        style={{
                          width:`${block.score}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        );
      }

      case "ayurveda":{
        const ayurveda=
          patient?.final_ayurveda_result||{};

        const prakriti=
          ayurveda.prakriti||{};

        const agni=
          ayurveda.agni||{};

        const ama=
          ayurveda.ama||{};

        const correlation=
          ayurveda.correlation||{};

        return(
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-5">
              <MetricCard
                label="Prakriti Type"
                value={
                  prakriti.prakriti_type
                }
              />

              <MetricCard
                label="Dominant Dosha"
                value={
                  prakriti.dominant_dosha
                }
              />

              <MetricCard
                label="Risk Tier"
                value={
                  ayurveda.risk_tier
                }
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <MetricCard
                label="Vata %"
                value={`${prakriti.vata_pct||0}%`}
              />

              <MetricCard
                label="Pitta %"
                value={`${prakriti.pitta_pct||0}%`}
              />

              <MetricCard
                label="Kapha %"
                value={`${prakriti.kapha_pct||0}%`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <MetricCard
                label="Primary Dosha"
                value={ayurveda.primary_dosha}
              />

              <MetricCard
                label="Primary Level"
                value={ayurveda.primary_level}
              />

              <MetricCard
                label="Secondary Dosha"
                value={ayurveda.secondary_dosha}
              />

              <MetricCard
                label="Secondary Level"
                value={ayurveda.secondary_level}
              />
            </div>

            <div className="rounded-[24px] border p-6">
              <h3 className="font-semibold mb-3">
                Agni Assessment
              </h3>

              <p>
                {agni.agni_type||"-"}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                {agni.clinical_meaning||"-"}
              </p>
            </div>

            <div className="rounded-[24px] border p-6">
              <h3 className="font-semibold mb-3">
                Ama Assessment
              </h3>

              <p>
                Severity :{" "}
                {ama.severity||"-"}
              </p>

              <p>
                Percentage :{" "}
                {ama.percentage||0}%
              </p>
            </div>

            <div className="rounded-[24px] border p-6">
              <h3 className="font-semibold mb-3">
                Correlation Summary
              </h3>

              <p>
                {correlation.summary||"-"}
              </p>
            </div>

            <div className="rounded-[24px] border p-6">
              <h3 className="font-semibold mb-3">
                Clinical Summary
              </h3>

              <p>
                {ayurveda.clinical_summary||"-"}
              </p>
            </div>
          </div>
        );
      }

      case "clinical":{
        const clinical=
          patient?.clinical_answers||{};

        return(
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-5">
              <MetricCard
                label="Height"
                value={clinical.height}
              />

              <MetricCard
                label="Libido"
                value={clinical.libido}
              />

              <MetricCard
                label="Hair / Skin"
                value={clinical.hairSkin}
              />

              <MetricCard
                label="Primary Goal"
                value={clinical.primaryGoal}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <MetricCard
                label="Medical Conditions"
                value={
                  clinical.medicalConditions?.join(
                    ", "
                  )
                }
              />

              <MetricCard
                label="Family History"
                value={
                  clinical.familyHistory?.join(
                    ", "
                  )
                }
              />
            </div>

            <div className="rounded-[24px] border bg-[#F8FAFC] p-6">
              <h3 className="font-semibold text-[#173C68] mb-4">
                Medication Details
              </h3>

              <p className="text-slate-600">
                {clinical.medicationDetails||"-"}
              </p>
            </div>

            <div className="rounded-[24px] border bg-white p-6">
              <h3 className="text-xl font-semibold text-[#173C68] mb-6">
                Practitioner Notes
              </h3>

              <div className="space-y-5">
                <NoteCard
                  title="Primary Diagnosis"
                  value={
                    patient?.primary_diagnosis
                  }
                />

                <NoteCard
                  title="Secondary Contributors"
                  value={
                    patient?.secondary_contributors
                  }
                />

                <NoteCard
                  title="Dosha Imbalance"
                  value={
                    patient?.dosha_imbalance
                  }
                />

                <NoteCard
                  title="Samprapti Stage"
                  value={
                    patient?.samprapti_stage
                  }
                />

                <NoteCard
                  title="Root Cause"
                  value={
                    patient?.root_cause
                  }
                />

                <NoteCard
                  title="Priority Intervention"
                  value={
                    patient?.priority_intervention
                  }
                />

                <NoteCard
                  title="Protocol Tier"
                  value={
                    patient?.protocol_tier
                  }
                />

                <NoteCard
                  title="Follow Up Timeline"
                  value={
                    patient?.follow_up_timeline
                  }
                />
              </div>
            </div>
          </div>
        );
      }

      case "lifestyle":
        return(
          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(
              patient?.matrix_answers||{}
            ).map(([key,value])=>(
              <MetricCard
                key={key}
                label={key.replaceAll(
                  "_",
                  " "
                )}
                value={
                  Array.isArray(value)
                    ?value.join(", ")
                    :value
                }
              />
            ))}
          </div>
        );

      default:
        return(
          <div>
            No Report Found
          </div>
        );
    }
  };

  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-[#F6F9F8] p-4 sm:p-6 lg:p-8">
      <div className="mb-8 print:hidden">
        <button
          onClick={()=>
            navigate("/dashboard/reports")
          }
          className="h-12 px-6 rounded-full bg-white border flex items-center gap-2 hover:shadow-md transition-all"
        >
          <ArrowLeft size={18}/>
          Back To Reports
        </button>
      </div>

      <div id="report-pdf">
        {/* PATIENT INFORMATION */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <User
              size={22}
              className="text-[#1E7A3A]"
            />

            <h2 className="text-2xl font-semibold text-[#173C68]">
              Patient Information
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-5">
            <InfoCard
              label="Patient Name"
              value={patient?.name}
            />

            <InfoCard
              label="Gender"
              value={patient?.gender}
            />

            <InfoCard
              label="Status"
              value="Active"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <InfoCard
              label="Email"
              value={patient?.email}
            />

            <InfoCard
              label="Phone"
              value={patient?.phone}
            />

            <InfoCard
              label="Location"
              value={patient?.location}
            />
          </div>
        </div>

        {/* ASSESSMENT */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText
              size={22}
              className="text-[#1E7A3A]"
            />

            <h2 className="text-2xl font-semibold text-[#173C68]">
              {reportTitle[reportType]}
            </h2>
          </div>

          {renderReportContent()}
        </div>

        {/* LAB REPORTS - WEB ONLY */}
        {reportType==="clinical"&&
          labReports.length>0&&(
            <div className="bg-white rounded-[32px] p-8 shadow-sm mb-8 print:hidden">
              <div className="flex items-center gap-3 mb-8">
                <FileText
                  size={22}
                  className="text-[#1E7A3A]"
                />

                <div>
                  <h2 className="text-2xl font-semibold text-[#173C68]">
                    Laboratory Reports
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Patient laboratory reports and diagnostic documents
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {labReports.map(report=>{
                  const url=
                    labReportUrls[report.id];

                  return(
                    <div
                      key={report.id}
                      className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#F8FAFC]"
                    >
                      <div className="flex flex-col gap-4 border-b bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173C68]/10">
                            <FileText
                              size={20}
                              className="text-[#173C68]"
                            />
                          </div>

                          <div>
                            <h3 className="font-semibold text-[#173C68]">
                              {report.report_name}
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                              {report.file_type||"PDF"}
                            </p>
                          </div>
                        </div>

                        {url&&(
                          <div className="flex gap-3">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-xl bg-[#173C68] px-4 py-2.5 text-sm font-medium text-white"
                            >
                              Open
                            </a>

                            <a
                              href={url}
                              download={
                                report.report_name
                              }
                              className="rounded-xl bg-[#1E7A3A] px-4 py-2.5 text-sm font-medium text-white"
                            >
                              Download
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="h-[700px] bg-slate-200">
                        {url?(
                          <iframe
                            src={url}
                            title={
                              report.report_name
                            }
                            className="h-full w-full border-0"
                          />
                        ):(
                          <div className="flex h-full items-center justify-center text-slate-500">
                            Loading laboratory report...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* DOCTOR NOTES WEBPAGE */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm">
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
              onChange={e=>
                setPractitionerNotes(
                  e.target.value
                )
              }
              placeholder="Enter practitioner notes..."
              className="w-full rounded-[20px] border border-slate-200 p-5 text-[15px] font-medium text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#173C68] bg-[#F8FAFC]"
            />
          </div>

          <div className="mt-10 pt-8 border-t">
            <h3 className="text-lg font-bold text-[#173C68] mb-5">
              Practitioner Signature
            </h3>

            <select
              value={
                selectedSignature?.id||""
              }
              onChange={e=>
                setSelectedSignature(
                  signatures.find(
                    item=>
                      String(item.id)===
                      e.target.value
                  )||null
                )
              }
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
                  src={
                    selectedSignature.signature_url
                  }
                  alt="Practitioner Signature"
                  className="h-24 object-contain"
                />

                <h3 className="font-bold text-[#173C68] mt-4">
                  {
                    selectedSignature.practitioner_name
                  }
                </h3>

                <p className="text-slate-500">
                  {selectedSignature.designation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 print:hidden">
        <button
          onClick={downloadPDF}
          className="h-14 px-10 rounded-3xl bg-gradient-to-r from-[#1E7A3A] to-[#2FA84F] text-white font-semibold shadow-lg hover:scale-105 transition-all"
        >
          Download Report PDF
        </button>
      </div>
    </div>
  );
};

const InfoCard=({label,value})=>(
  <div className="rounded-[24px] p-5 bg-[#F8FAFC] border">
    <p className="text-xs uppercase tracking-wider text-slate-400">
      {label}
    </p>

    <p className="text-lg font-semibold text-[#173C68] mt-2">
      {value||"-"}
    </p>
  </div>
);

const MetricCard=({label,value})=>(
  <div className="rounded-[24px] p-5 bg-[#F8FAFC] border">
    <p className="text-xs uppercase tracking-wider text-slate-400">
      {label}
    </p>

    <p className="text-xl font-semibold text-[#173C68] mt-2">
      {value||"-"}
    </p>
  </div>
);

const NoteCard=({title,value})=>(
  <div className="rounded-[24px] p-6 bg-[#F8FAFC] border">
    <h3 className="font-semibold text-[#173C68] mb-3">
      {title}
    </h3>

    <p className="text-slate-600 leading-7">
      {value||"-"}
    </p>
  </div>
);

export default ReportDisplay;