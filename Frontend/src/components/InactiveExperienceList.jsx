import InactiveExperiencesItem from "./InactiveExperienceItem.jsx";

function InactiveExperienceList ({ inactiveExperiences }) {
    
    return (
        <ul>
            {inactiveExperiences.map(inactiveExperience => (
                <InactiveExperiencesItem key={inactiveExperience.id} inactiveExperience={inactiveExperience} />
            ))}
        </ul>
    );
}

export default InactiveExperienceList;