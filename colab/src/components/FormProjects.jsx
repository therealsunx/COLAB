'use client';

import { PlusCircleIcon, TrashIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { buttons } from '../misc/styles';
import { AuthContext } from './AuthContext';
import { addProject, defaultProjectData, updateUser } from '../firebase/firestore';
import { arrayUnion } from 'firebase/firestore';

const ProjectForm = () => {
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState(defaultProjectData);

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

    const handleSubmit = async e => {
        e.preventDefault();
        let fd = { ...formData, manager: auth.uid, members: [auth.uid] };
        await addProject(fd).then(async r => await updateUser(auth.uid, { projects: arrayUnion(r) }).then(u => window.location.href = `/${r}`));
        setFormData(defaultProjectData);
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto space-y-4 p-12">

            <p className='font-bold text-xl text-center p-6'>Create A New Project</p>

            <div className="form-div2">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                    Project Name
                </label>
                <input
                    type="text" id="name" name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-div2">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                    Intro to project
                </label>
                <input
                    type="text" id="intro" name="intro"
                    value={formData.intro}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-div2">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                    Detail about project
                </label>
                <textarea
                    type="text" id="detail" name="detail" rows={4}
                    value={formData.detail}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            {/* Skills */}
            <div className="form-div2">
                <label className="block text-sm font-bold mb-2">
                    Skills Required
                </label>
                <div className='flex-grow flex flex-wrap gap-4'>
                    {formData.skills.map((skill, index) => (
                        <div key={index} className="flex gap-4 items-center">
                            <input
                                type="text"
                                value={skill}
                                onChange={(e) => handleSkillsChange(e, index)}
                                className="form-input"
                                required
                            />
                            <TrashIcon type="button" onClick={() => handleRemoveSkill(index)} className="w-10 h-10 p-2 hover:bg-[#a00] text-white rounded-full" />
                        </div>
                    ))}
                    <PlusCircleIcon type="button" onClick={handleAddSkill} className="self-end w-10 h-10 p-2 rounded-full hover:bg-primary" />
                </div>
            </div>

            {/* Members */}
            <div className="form-div2">
                <label className="block text-sm font-bold mb-2">
                    Add other Members
                </label>
                <div className='flex-grow flex flex-wrap gap-4'>
                    {formData.members.map((member, index) => (
                        <div key={index} className="flex gap-4 items-center">
                            <input
                                type="text"
                                value={member}
                                onChange={(e) => handleMemberChange(e, index)}
                                className="form-input"
                                required
                            />
                            <TrashIcon onClick={() => handleRemoveMember(index)} className="w-10 h-10 p-2 hover:bg-[#a00] text-white rounded-full" />
                        </div>
                    ))}
                    <PlusCircleIcon onClick={handleAddMember} className="self-end w-10 h-10 p-2 rounded-full hover:bg-primary" />
                </div>
            </div>

            <button type="submit" className={`${buttons.bulb} px-8 py-2`}>
                Submit
            </button>
        </form>
    );
};

export default ProjectForm;
