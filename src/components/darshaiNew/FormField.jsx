import React, { useId } from "react";
import { Check, AlertCircle } from "lucide-react";
/**
 * Universal DARSHAI FormField Component
 *
 * Institutional Specifications:
 * - Field height: 52–56 px desktop / 50–54 px mobile
 * - Radius: 12–16 px (standard 14 px)
 * - Visible labels: always visible, never relying on placeholder-only labels
 * - Inline validation: clear error messages and valid confirmation
 */
export function FormField({
  id: customId,
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  optional = false,
  disabled = false,
  error,
  touched = false,
  isValid = false,
  helperText,
  className = "",
  autoComplete,
  maxLength,
}) {
  const generatedId = useId();
  const id = customId || generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const showError = touched && Boolean(error);
  const showSuccess = touched && !error && isValid && value.trim().length > 0;
  return (
    <div className={`w-full ${className}`.trim()}>
      <label htmlFor={id} className="darshai-form-label">
        <span className="flex items-center gap-1.5">
          <span>{label}</span>
          {required && (
            <span className="text-[#0E4D3A] font-bold" title="Required field">
              *
            </span>
          )}
        </span>
        {required && (
          <span className="darshai-form-label-badge">(required)</span>
        )}
        {optional && (
          <span className="darshai-form-label-badge">(optional)</span>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-invalid={showError}
          aria-describedby={
            showError ? errorId : helperText ? helperId : undefined
          }
          className={`darshai-input ${
            showError
              ? "darshai-input-error pr-11"
              : showSuccess
                ? "darshai-input-valid pr-11"
                : ""
          }`}
        />
        {showError && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C93B32] pointer-events-none flex items-center">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
        {showSuccess && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0E4D3A] pointer-events-none flex items-center bg-[#0E4D3A]/10 p-1 rounded-full">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
          </div>
        )}
      </div>
      {showError && (
        <p id={errorId} role="alert" className="darshai-field-error-msg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
      {!showError && helperText && (
        <p id={helperId} className="darshai-field-helper-msg">
          {helperText}
        </p>
      )}
    </div>
  );
}
export function SelectField({
  id: customId,
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select an option",
  required = false,
  optional = false,
  disabled = false,
  error,
  touched = false,
  isValid = false,
  helperText,
  className = "",
}) {
  const generatedId = useId();
  const id = customId || generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const showError = touched && Boolean(error);
  const showSuccess = touched && !error && isValid && Boolean(value);
  return (
    <div className={`w-full ${className}`.trim()}>
      <label htmlFor={id} className="darshai-form-label">
        <span className="flex items-center gap-1.5">
          <span>{label}</span>
          {required && (
            <span className="text-[#0E4D3A] font-bold" title="Required field">
              *
            </span>
          )}
        </span>
        {required && (
          <span className="darshai-form-label-badge">(required)</span>
        )}
        {optional && (
          <span className="darshai-form-label-badge">(optional)</span>
        )}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-invalid={showError}
          aria-describedby={
            showError ? errorId : helperText ? helperId : undefined
          }
          className={`darshai-select appearance-none pr-10 cursor-pointer ${
            showError
              ? "darshai-select-error"
              : showSuccess
                ? "darshai-select-valid"
                : ""
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label} {opt.badge ? `(${opt.badge})` : ""}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6E6E73] flex items-center gap-1">
          {showSuccess && (
            <span className="text-[#0E4D3A] bg-[#0E4D3A]/10 p-0.5 rounded-full mr-1">
              <Check className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
            </span>
          )}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {showError && (
        <p id={errorId} role="alert" className="darshai-field-error-msg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
      {!showError && helperText && (
        <p id={helperId} className="darshai-field-helper-msg">
          {helperText}
        </p>
      )}
    </div>
  );
}
export function TextAreaField({
  id: customId,
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  required = false,
  optional = false,
  disabled = false,
  error,
  touched = false,
  helperText,
  className = "",
  maxLength,
}) {
  const generatedId = useId();
  const id = customId || generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const showError = touched && Boolean(error);
  return (
    <div className={`w-full ${className}`.trim()}>
      <label htmlFor={id} className="darshai-form-label">
        <span className="flex items-center gap-1.5">
          <span>{label}</span>
          {required && (
            <span className="text-[#0E4D3A] font-bold" title="Required field">
              *
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          {maxLength && (
            <span className="text-xs text-[#6E6E73] tabular-nums">
              {value.length}/{maxLength}
            </span>
          )}
          {required && (
            <span className="darshai-form-label-badge">(required)</span>
          )}
          {optional && (
            <span className="darshai-form-label-badge">(optional)</span>
          )}
        </div>
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        aria-invalid={showError}
        aria-describedby={
          showError ? errorId : helperText ? helperId : undefined
        }
        className={`darshai-textarea ${showError ? "darshai-textarea-error" : ""}`}
      />
      {showError && (
        <p id={errorId} role="alert" className="darshai-field-error-msg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
      {!showError && helperText && (
        <p id={helperId} className="darshai-field-helper-msg">
          {helperText}
        </p>
      )}
    </div>
  );
}
