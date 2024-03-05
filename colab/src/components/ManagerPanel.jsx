"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Adjust the import path as necessary
import {
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getMultipleUsers, getProjectData, getUserByEmail, updateLinks, updateProject, updateUser } from "../firebase/firestore";
import { buttons } from "../misc/styles";
import { Check, Trash, UserRound } from "lucide-react";
import Link from "next/link";


const ManagerPanel = ({ auth, project, links, setProject, setLinks }) => {

  const [formValues, setFormValues] = useState({
    name: project.name,
    intro: project.intro,
    detail: project.detail,
  });
  const [invites, setInvites] = useState(null);
  const [applicants, setApplicants] = useState(null);

  useEffect(() => {
    const _ff = async () => {
      if (links?.invites)
        getMultipleUsers(links.invites).then(r => setInvites(r));

      if (links?.applicants)
        getMultipleUsers(links.applicants).then(r => setApplicants(r));
    };
    _ff();
  }, [links]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    updateProject(project.id, formValues);
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const removeMember = async (memberId) => {
    if (auth.uid === memberId) {
      alert("Cannot remove yourself from the team");
      return;
    }
    console.log(memberId);
    await updateProject(project.id, { members: arrayRemove(memberId) }).then(x => setProject({ ...project, members: project.members.filter(x => x.uid != memberId) }));
    await updateUser(memberId, { projects: arrayRemove(project.id) });
  };

  const cancelInvitation = async (userId) => {
    await updateUser(userId, { invites: arrayRemove(project.id) });
    await updateLinks(project.id, { invites: arrayRemove(userId) }).then(_ => setLinks({ ...links, invites: links.invites.filter(x => x !== userId) }));
  };

  const handleSendInvitationSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.inviteId.value;
    let user = await getUserByEmail(email);
    if (!user) {
      alert("Invalid email");
      return;
    }
    if (project.members.find(x => x.uid === user.uid) || invites.find(x => x.uid === user.uid)) return;
    await updateUser(user.uid, { invites: arrayUnion(project.id) }).then(async _ => {
      await updateLinks(project.id, { invites: arrayUnion(user.uid) }).then(x => setLinks({ invites: [...invites, user.uid] }));
    })
    e.target.elements.inviteId.value = "";
  };

  const acceptApplicant = async (userID) => {
    await updateProject(project.id, { members: arrayUnion(userID) }).then(async _ => await getProjectData(project.id).then(x => setProject(x)));
    await updateLinks(project.id, { applicants: arrayRemove(userID) }).then(_ => setLinks({ ...links, applicants: links.applicants.filter(x => x != userID) }));
    await updateUser(userID, { projects: arrayUnion(project.id) });
  }

  const rejectApplicant = async (userID) => {
    await updateLinks(project.id, { applicants: arrayRemove(userID) }).then(_ => setLinks({ ...links, applicants: links.applicants.filter(x => x != userID) }));
  }

  if (!project) {
    return <div>You do not have permission to view or edit this project.</div>;
  }

  return (
    <div className="w-full bg-[#4446] p-12 overflow-y-auto h-full">
      <p className="text-center font-bold text-2xl">Manager Panel</p>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">

          <div className="flex items-center">
            <label htmlFor="projectName" className="flex-1">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="projectIntro"
              className="flex-1"
            >
              Project Intro
            </label>
            <textarea
              id="projectIntro"
              name="intro"
              rows={3}
              value={formValues.intro}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="projectDetail"
              className="flex-1"
            >
              Project Detail
            </label>
            <textarea
              id="projectDetail"
              name="detail"
              value={formValues.detail}
              onChange={handleInputChange}
              className="form-input"
              rows={8}
            ></textarea>
          </div>
          <button
            type="submit"
            className={`${buttons.bulb} px-8 py-3 border-2`}
          >
            Save Project Details
          </button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Members</h2>
        {project && (
          <ul className="divide-y divide-gray-200">
            {project.members.map((member, index) => (
              <li
                key={index}
                className="py-4 flex justify-between items-center"
              >
                <Link href={`/account/${member.uid}`} className="flex items-center gap-4">
                  {member?.photourl ? <img src={member.photourl} className="size-12 rounded-full" /> : <UserRound />}
                  <p className="text-sm font-medium text-white">{member.name}</p>
                </Link>
                <div>
                  <Trash
                    onClick={() => removeMember(member.uid)}
                    className={`${buttons.redbulb} p-2 size-10 stroke-red-500`}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Invitations</h2>

        {<ul className="divide-y divide-gray-200">
          {invites && invites.map((user, index) => (
            <li
              key={index}
              className="py-4 flex justify-between items-center"
            >
              <Link href={`/account/${user.uid}`} className="flex items-center gap-4">
                {user?.photourl ? <img src={user.photourl} className="size-12 rounded-full" /> : <UserRound />}
                <p className="text-sm font-medium text-white">{user.name}</p>
              </Link>

              <Trash
                onClick={() => cancelInvitation(user.uid)}
                className={`${buttons.redbulb} p-2 size-10 stroke-red-500`}
              />
            </li>
          ))}
        </ul>
        }
        <form onSubmit={handleSendInvitationSubmit} className="mt-4 space-y-4 flex flex-col">
          <div className="flex  items-center">
            <label
              htmlFor="inviteId"
              className="flex-1"
            >
              Invite a Person
            </label>
            <input
              type="email"
              id="inviteId"
              name="inviteId"
              className="form-input"
              placeholder="johndoe@example.com"
            />
          </div>
          <button
            type="submit"
            className={`${buttons.bulb} px-8 py-2 border-2 self-end`}
          >
            Send Invitation
          </button>
        </form>

        <div className="w-full border-t-2 space-y-4 mt-12 py-4">
          <p className="font-semibold text-xl">Applicants</p>

          {applicants && applicants.length > 0 ?
            <ul className="divide-y divide-gray-200">
              {applicants.map((user, index) => (
                <li
                  key={index}
                  className="py-4 flex justify-between items-center"
                >
                  <Link href={`/account/${user.uid}`} className="flex items-center gap-4">
                    {user?.photourl ? <img src={user.photourl} className="size-12 rounded-full" /> : <UserRound />}
                    <p className="text-sm font-medium text-white">{user.name}</p>
                  </Link>

                  <div className="flex gap-4 items-center">

                    <Check onClick={() => acceptApplicant(user.uid)}
                      className={`${buttons.bulb} p-2 size-10 stroke-secondary`}
                    />

                    <Trash
                      onClick={() => rejectApplicant(user.uid)}
                      className={`${buttons.redbulb} p-2 size-10 stroke-red-500`}
                    />
                  </div>
                </li>
              ))}
            </ul> :
            <p className="font-semibold">No Applicants here ...</p>
          }
        </div>
      </div>
    </div>
  );
};

export default ManagerPanel;
