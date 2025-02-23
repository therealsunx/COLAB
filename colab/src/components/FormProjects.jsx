'use client';

import { PlusCircleIcon, TrashIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { buttons } from '../misc/styles';
import { AuthContext } from './AuthContext';
import { createNewProject, defaultProjectData, getUserByEmail, updateUser } from '../firebase/firestore';

const ProjectForm = () => {
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({ ...defaultProjectData, invites: [] });
    const [hold, setHold] = useState(false);

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

    const handleInvitesChange = (e, index) => {
        const ninvite = [...formData.invites];
        ninvite[index] = e.target.value.trim();
        setFormData(prevState => ({
            ...prevState,
            invites: ninvite
        }));
    };

    const handleAddInvite = () => {
        setFormData(prevState => ({
            ...prevState,
            invites: [...prevState.invites, '']
        }));
    };

    const handleRemoveInvite = (index) => {
        const invites = [...formData.invites];
        invites.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            invites: invites
        }));
    };

    // const handleEmailCheck = async e => {
    //     e.preventDefault();
    //     await getUserByEmail(formData.invites[0]).then(r => console.log(r));
    // }

    const handleSubmit = async e => {
        setHold(true);
        e.preventDefault();
        let fd = { ...formData, manager: auth.uid, members: [auth.uid] };
        await createNewProject(fd)
            .then(u => {
                window.location.href = `/${u}`;
                setHold(false);
            });
        setFormData({ ...defaultProjectData, invites: [] });
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

            <div className="form-div2">
                <label className="block text-sm font-bold mb-2">
                    Invite Others to Project
                </label>
                <div className='flex-grow flex flex-wrap gap-4'>
                    {formData.invites.map((invite, index) => (
                        <div key={index} className="relative flex items-center">
                            <input
                                type="email"
                                value={invite}
                                onChange={(e) => handleInvitesChange(e, index)}
                                className="form-input"
                                placeholder='johndoe@example.com'
                                required
                            />
                            <TrashIcon onClick={() => handleRemoveInvite(index)} className="absolute right-0 size-8 p-2 hover:stroke-[#f00] text-white rounded-full" />
                        </div>
                    ))}
                    <PlusCircleIcon onClick={handleAddInvite} className="self-end size-10 p-2 rounded-full hover:stroke-secondary" />
                    {/* <button onClick={handleEmailCheck}>fetch</button> */}
                </div>
            </div>

            <button type="submit" disabled={hold} className={`${buttons.bulb} px-8 py-2`}>
                {hold ? "Submitting" : "Submit"}
            </button>
        </form>
    );
};

export default ProjectForm;
