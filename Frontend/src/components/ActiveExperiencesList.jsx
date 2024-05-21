import ActiveExperiencesItem from "./ActiveExperienceItem.jsx";

function ActiveExperienceList ({ activeExperiences }) {
    
    return (
        <ul>
            {activeExperiences.map(activeExperience => (
                <ActiveExperiencesItem key={activeExperience.id} activeExperience={activeExperience} />
            ))}
        </ul>
    );
}

export default ActiveExperienceList;