function ExperienceItem ({ experience, onSelect }) {
    const handleExperienceSelect = () => {
        onSelect(experience.id);
    };

    return (
        <li>
            <label>
                <input type="radio" name="experience" value={experience.id} onChange={handleExperienceSelect} />
                {experience.title}
            </label>
        </li>
    );
}

export default ExperienceItem;
