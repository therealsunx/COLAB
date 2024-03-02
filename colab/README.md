## Schema for data

### db
`   
    projects {
        name : string,
        intro : string,
        detail : string,
        skills : array (string),
        members : array (string *id*),
        manager : string *id*,
    }

    users {
        name : string,
        education : string,
        profession : string,
        experience : array (string),   :: format : "position; company; startDate
        projects : array (string * id * ),
        skills : array (string)
    }

    links : {
        repos : array (string)   :: format : github.com/repo-name
        boards : array (string)   :: board id
        tasks : array (string * id *)  
    }
`