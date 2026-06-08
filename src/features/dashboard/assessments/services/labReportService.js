// services/labReportService.js

import { supabase } from "../../lib/supabase";

export const uploadLabReport = async (
  patientId,
  file
) => {

  const fileName =
    `${patientId}/${Date.now()}-${file.name}`;

  const { error: uploadError } =
    await supabase.storage

      .from("lab-reports")

      .upload(
        fileName,
        file
      );

  if (uploadError)
    throw uploadError;

  const { data, error } =
    await supabase

      .from(
        "patient_lab_reports"
      )

      .insert({
        patient_id:
          patientId,

        report_name:
          file.name,

        file_path:
          fileName,

        file_size:
          file.size,

        file_type:
          file.type,
      })

      .select()

      .single();

  if (error)
    throw error;

  return data;

};