import { useRef, useState } from "react";
import { buttons, inputs } from "../misc/styles";

const def = {
    name: "",
    dob: "2000-01-01",
    country: "",
    email: "",
    phone: "",
    profession: "",
    education: "",
    skills: "",
    experience: 0
}

const NewUserForm = ({ setSessionToken, setNewUser }) => {

    const formref = useRef(null);
    const [form, setForm] = useState(def);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = () => {
        setForm(def);
    }

    return (
        <div className="h-screen flex m-auto p-12 justify-center">
            <div className="flex flex-col w-fit items-center justify-around rounded-2xl p-12 bg-[#fff2]">
                <p className="text-4xl font-bold p-12 rounded-full bg-primary border-x-2 border-secondary shadow-xl shadow-secondary">CO-LAB</p>

                <form
                    ref={formref}
                    onSubmit={handleSubmit}
                    className='mt-12 flex flex-col gap-4 bg-[#fff5] p-8 rounded-2xl'>

                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Name</p>
                        <input type='text' name='name' value={form.name} onChange={handleChange} className={inputs.basic} placeholder="John Doe" />
                    </div>
                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Date Of Birth</p>
                        <input type='date' name='dob' value={form.dob} onChange={handleChange} className={`${inputs.basic} cursor-text flex gap-16`} />
                    </div>
                    <hr />
                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Country</p>
                        <input type='text' name='country' value={form.country} onChange={handleChange} className={inputs.basic} placeholder="Nepal" />
                    </div>
                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Email</p>
                        <input type='email' name='email' value={form.email} onChange={handleChange} className={inputs.basic} placeholder="johndoe@example.com" />
                    </div>
                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Phone No.</p>
                        <input type='phone' name='phone' value={form.phone} onChange={handleChange} className={inputs.basic} placeholder="+9779801234567" />
                    </div>
                    <hr />
                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Education</p>
                        <input type='text' name='education' value={form.education} onChange={handleChange} className={inputs.basic} placeholder="Graduate" />
                    </div>
                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Profession</p>
                        <input type='text' name='profession' value={form.profession} onChange={handleChange} className={inputs.basic} placeholder="Software Engineer" />
                    </div>
                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Skills</p>
                        <input type='text' name='skills' value={form.skills} onChange={handleChange} className={inputs.basic} placeholder="Web development;UI/UX;" />
                    </div>
                    <div className='flex gap-12 items-center justify-between'>
                        <p className="w-max">Experience (years)</p>
                        <input type='number' name='experience' value={form.experience} onChange={handleChange} className={inputs.basic} placeholder="2" />
                    </div>
                    <hr />

                    <div className="flex justify-around gap-6">
                        <button type="submit" className={`py-4 flex-1 ${buttons.bulb}`}> Submit </button>
                        <button className={`py-4 flex-1 ${buttons.redbulb}`} onClick={() => setNewUser(false)}> Cancel </button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default NewUserForm;