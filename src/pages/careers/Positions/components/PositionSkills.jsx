const PositionSkills=({skills=[],title="Required Skills"})=>(
<div className="space-y-4">

<h4 className="text-sm font-semibold uppercase tracking-[.16em] text-[#162A1E]">
{title}
</h4>

<div className="flex flex-wrap gap-3">

{skills.map(skill=>(
<span
key={skill}
className="rounded-full border border-[#DCE7DF] bg-[#F7FAF8] px-4 py-2 text-[13px] font-medium text-[#35503F] transition-all hover:border-[#1E7A3A] hover:bg-[#EEF8F2] hover:text-[#1E7A3A]"
>
{skill}
</span>
))}

{!skills.length&&(
<p className="text-sm text-[#8A958D]">
No skills specified.
</p>
)}

</div>

</div>
);

export default PositionSkills;