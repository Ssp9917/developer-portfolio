export default function FormField({ label, children, className = "" }) {
  return (
    <label className={`block mb-4 ${className}`}>
      {label && <span className="admin-label">{label}</span>}
      {children}
    </label>
  );
}
