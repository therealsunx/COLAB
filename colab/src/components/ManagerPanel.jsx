"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Adjust the import path as necessary
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { collection } from "firebase/firestore";


const   ManagerPanel = ({ projectId, auth }) => {
  const [project, setProject] = useState(null);
  const [links, setLinks] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    intro: "",
    detail: "",
  });
  const [newMemberId, setNewMemberId] = useState("");

  const fetchProjectAndLinks = async () => {
    const projectRef = doc(db, "projects", projectId);
    const linksRef = doc(db, "links", projectId);

    const projectDoc = await getDoc(projectRef);
    const linksDoc = await getDoc(linksRef);

    //   console.log("ProjectDoc", projectDoc.data());
    //   console.log("LinksDoc", linksDoc.data());
    // console.log("projectId", projectId)

    if (projectDoc.exists() && linksDoc.exists()) {
      setProject(projectDoc.data());
      setLinks(linksDoc.data());

      setFormValues({
        name: projectDoc.data().name,
        intro: projectDoc.data().intro,
        detail: projectDoc.data().detail,
      });
    }
  };

  useEffect(() => {
    if (!auth) return;

    fetchProjectAndLinks();
  }, [projectId]);

  // Check if the current user is the manager of the project
  const isManager = project && project.manager === auth.uid;
  //  console.log(isManager);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isManager) return; // Ensure only the manager can update the project
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, formValues);
    // Optionally, re-fetch project data to update the UI
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewMemberIdChange = (e) => {
    setNewMemberId(e.target.value);
  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    addMember(newMemberId);
    setNewMemberId(""); // Clear the input field
  };

  const updateProject = async (field, value) => {
    if (!isManager) return; // Ensure only the manager can update the project
    const projectRef = doc(db, "projects", projectId);
    console.log("Inside updateProject projectRef", projectRef);
    await updateDoc(projectRef, { [field]: value });
    // Optionally, re-fetch project data to update the UI
  };

  const addMember = async (memberId) => {
    if (!isManager) return; // Ensure only the manager can add members
    const usersRef = collection(db, "users");
    const userDoc = await getDoc(doc(usersRef, memberId));
    if (!userDoc.exists()) {
        alert("Member ID does not exist in the users collection.");
        return; // Stop the function if the member ID is not found
    }
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, { members: arrayUnion(memberId) });
    // Optionally, re-fetch project data to update the UI
    await fetchProjectAndLinks();
  };

  const removeMember = async (memberId) => {
    if (!isManager) return; // Ensure only the manager can remove members
    const usersRef = collection(db, "users");
    const userDoc = await getDoc(doc(usersRef, memberId));
    if (!userDoc.exists()) {
        alert("Member ID does not exist in the users collection.");
        return; // Stop the function if the member ID is not found
    }
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, { members: arrayRemove(memberId) });
    // Optionally, re-fetch project data to update the UI
    await fetchProjectAndLinks();
  };

  const sendInvitation = async (userId) => {
    if (!isManager) return; // Ensure only the manager can send invitations
    const linksRef = doc(db, "links", projectId);
    console.log("Inside sendInvitation", linksRef);
    await updateDoc(linksRef, { invites: arrayUnion(userId) });
    // Optionally, re-fetch links data to update the UI
    await fetchProjectAndLinks();
  };

  const cancelInvitation = async (userId) => {
    if (!isManager) return; // Ensure only the manager can cancel invitations
    const linksRef = doc(db, "links", projectId);
    await updateDoc(linksRef, { invites: arrayRemove(userId) });
    // Optionally, re-fetch links data to update the UI
    await fetchProjectAndLinks();
  };

  const handleSendInvitationSubmit = async (e) => {
    e.preventDefault();
    const userId = e.target.elements.inviteId.value;
    await sendInvitation(userId);
    // Optionally, clear the input field
    e.target.elements.inviteId.value = "";
  };

  if (!project || !isManager) {
    return <div>You do not have permission to view or edit this project.</div>;
  }

  return (
    <div className="w-full bg-[#4446] p-12 overflow-y-auto h-full">
      <p className="text-center font-bold text-2xl">Manager Panel</p>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="projectIntro"
              className="block text-sm font-medium text-gray-700"
            >
              Project Intro
            </label>
            <input
              type="text"
              id="projectIntro"
              name="intro"
              value={formValues.intro}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="projectDetail"
              className="block text-sm font-medium text-gray-700"
            >
              Project Detail
            </label>
            <textarea
              id="projectDetail"
              name="detail"
              value={formValues.detail}
              onChange={handleInputChange}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Project Details
          </button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Members</h2>
        {project && (
          <ul className="divide-y divide-gray-200">
            {project.members.map((memberId, index) => (
              <li
                key={index}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium text-white">{memberId}</p>
                </div>
                <div>
                  <button
                    onClick={() => removeMember(memberId)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Add member form */}
        <form onSubmit={handleAddMemberSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="memberId"
              className="block text-sm font-medium text-gray-700"
            >
              Member ID
            </label>
            <input
              type="text"
              id="memberId"
              name="memberId"
              value={newMemberId}
              onChange={handleNewMemberIdChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Member
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Invitations</h2>
        {/* Render invitations and send/cancel invitation functionality */}
        {/* Example: */}

        {links && (
          <ul className="divide-y divide-gray-200">
            {links.invites.map((inviteId, index) => (
              <li
                key={index}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {inviteId}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => cancelInvitation(inviteId)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Cancel Invitation
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Send invitation form */}
        <form onSubmit={handleSendInvitationSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="inviteId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              type="text"
              id="inviteId"
              name="inviteId"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Invitation
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerPanel;
