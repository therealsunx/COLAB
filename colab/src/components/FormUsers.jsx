import { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    profession: "",
    experience: [],
    projects: [],
    skills: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleExperienceChange = (e, index) => {
    const newExperience = [...formData.experience];
    newExperience[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      experience: newExperience,
    }));
  };

  const handleAddExperience = () => {
    setFormData((prevState) => ({
      ...prevState,
      experience: [...prevState.experience, ""],
    }));
  };

  const handleRemoveExperience = (index) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      experience: newExperience,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data or perform further actions here
    console.log(formData);
  };
  const handleAddProject = () => {
    setFormData((prevState) => ({
      ...prevState,
      projects: [...prevState.projects, ""],
    }));
  };

  const handleRemoveProject = (index) => {
    const newProjects = [...formData.projects];
    newProjects.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      projects: newProjects,
    }));
  };

  const handleProjectChange = (e, index) => {
    const newProjects = [...formData.projects];
    newProjects[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      projects: newProjects,
    }));
  };

  const handleAddSkill = () => {
    setFormData((prevState) => ({
      ...prevState,
      skills: [...prevState.skills, ""],
    }));
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      skills: newSkills,
    }));
  };

  const handleSkillChange = (e, index) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      skills: newSkills,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Education
        </label>
        <input
          type="text"
          id="education"
          name="education"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="profession"
        >
          Profession
        </label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      {/* Experience */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Experience
        </label>
        {formData.experience.map((exp, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={exp}
              onChange={(e) => handleExperienceChange(e, index)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="ml-2 px-3 py-2 bg-red-500 text-white rounded focus:outline-none"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExperience}
          className="px-3 py-2 bg-green-500 text-white rounded focus:outline-none"
        >
          Add Experience
        </button>
      </div>

      {/* Projects */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Projects
        </label>
        {formData.projects.map((project, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={project}
              onChange={(e) => handleProjectChange(e, index)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveProject(index)}
              className="ml-2 px-3 py-2 bg-red-500 text-white rounded focus:outline-none"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddProject}
          className="px-3 py-2 bg-green-500 text-white rounded focus:outline-none"
        >
          Add Project
        </button>
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
              onChange={(e) => handleSkillChange(e, index)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveSkill(index)}
              className="ml-2 px-3 py-2 bg-red-500 text-white rounded focus:outline-none"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSkill}
          className="px-3 py-2 bg-green-500 text-white rounded focus:outline-none"
        >
          Add Skill
        </button>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;
