# CO-LAB


### HOW TO RUN
* Install all the deps by going into each directory and run `npm i`
* Go to whiteboard directory and run `npm start`
* Go to colab directory in another terminal and run `npm run dev`
* Go to the link provided on the console

----------- TODO--------
    * Implement readme decoding (same as github readme)
------------------------

------------- project ----------------
project : {
    normal_data : { title, description, README, skills, manager, members[] }
    link_data : {canvas_data[], repo_data[]}
    // chat_data : message_stack // implement on separate table
}

----------------- user ---------------
user : {name, dob, skills, ....,  projects[]}

--------------- chat ----------------
message : {username, type: (img, text), payload, datetime }
message-stack: [m0, m1, m2, m3, ..... m1000] ///// mi : message

repo_data : {repo_name, description, link}
canvas_data : {canvas_name, description, board_id}

Server@Colab
Colab@Server
