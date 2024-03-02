import { useState } from 'react';

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        intro: '',
        detail: '',
        skills: [],
        members: [],
        manager: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSkillsChange = (e, index) => {
        const newSkills = [...formData.skills];
        newSkills[index] = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            skills: newSkills
        }));
    };

    const handleAddSkill = () => {
        setFormData(prevState => ({
            ...prevState,
            skills: [...prevState.skills, '']
        }));
    };

    const handleRemoveSkill = (index) => {
        const newSkills = [...formData.skills];
        newSkills.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            skills: newSkills
        }));
    };

    const handleMemberChange = (e, index) => {
        const newMembers = [...formData.members];
        newMembers[index] = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            members: newMembers
        }));
    };

    const handleAddMember = () => {
        setFormData(prevState => ({
            ...prevState,
            members: [...prevState.members, '']
        }));
    };

    const handleRemoveMember = (index) => {
        const newMembers = [...formData.members];
        newMembers.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            members: newMembers
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data or perform further actions here
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Project Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    required
                />
            </div>
            {/* Add other fields similarly */}

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Intro
                </label>
                <input
                    type="text"
                    id="intro"
                    name="intro"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Detail
                </label>
                <input
                    type="text"
                    id="detail"
                    name="detail"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    required
                />
            </div>

            {/* Skills */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Skills
                </label>
                {formData.skills.map((skill, index) => (
                    <div key={index} className="flex mb-2">
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleSkillsChange(e, index)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            required
                        />
                        <button type="button" onClick={() => handleRemoveSkill(index)} className="ml-2 px-3 py-2 bg-red-500 text-white rounded focus:outline-none">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddSkill} className="px-3 py-2 bg-green-500 text-white rounded focus:outline-none">Add Skill</button>
            </div>

            {/* Members */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Members
                </label>
                {formData.members.map((member, index) => (
                    <div key={index} className="flex mb-2">
                        <input
                            type="text"
                            value={member}
                            onChange={(e) => handleMemberChange(e, index)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            required
                        />
                        <button type="button" onClick={() => handleRemoveMember(index)} className="ml-2 px-3 py-2 bg-red-500 text-white rounded focus:outline-none">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddMember} className="px-3 py-2 bg-green-500 text-white rounded focus:outline-none">Add Member</button>
            </div>

            {/* Manager */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manager">
                    Manager
                </label>
                <input
                    type="text"
                    id="manager"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    required
                />
            </div>

            <div className="mb-4">
                <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;
