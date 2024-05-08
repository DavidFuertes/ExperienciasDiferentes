import ExperienceItem from './ExperienceItem';

function ExperienceList ({ experiences, onSelectExperience }) {
    return (
        <ul>
            {experiences.map(experience => (
                <ExperienceItem key={experience.id} experience={experience} onSelect={onSelectExperience} />
            ))}
        </ul>
    );
}

export default ExperienceList;
