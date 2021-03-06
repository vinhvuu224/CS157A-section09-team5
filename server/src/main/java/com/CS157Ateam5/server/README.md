API Usage guide:

/location - For accessing `location` entity
- GET: Returns all locations
- POST: (city, state, country, time_zone, username) - Body. Updates 'In' table
- PATCH: (location_id, param_name, param_value) (e.g. 1, "state" "California").
- DELETE: (location_id)

/permissions - For accessing `permissions` entity
- GET: (permission_id) Returns permission_level
- POST: (permission_level) - Body
- PATCH: (permission_id, permission_level) (e.g. 1, "Full").
- DELETE: (permission_id)

/projects- For accessing `projects` entity
- GET: (project_id) Returns all user_ids and usernames for a project
- POST: (project_name, username) - Body. Creates "Full" permission entry in userpermissionproject and permissions
- PATCH: (project_id, project_name, username) (e.g. 1, "Bug Tracker", "Bug Watcher").
- DELETE: (project_id) Deletes all corresponding relationships 

/getprojects
- GET: (user_id) Returns all projects of a user

/tasks- For accessing `tasks` entity
- GET: (project_id OR task_id) Returns all tasks in project, OR details of single task respectively
- POST: (name, description, progress, project_id) - Body. Updates HaveTask relationship . Returns task
- PATCH: (name, description, progress, project_id) - Body. Returns task.
- DELETE: (task_id) Deletes havetask relationships 

- For accessing `users` entity
/users
- GET: Use (username) Returns user attributes, location, and projects of the user. Includes project_ids, permission_ids and location_ids
"/"
- POST: (username, email , password, confirmPassword) - Body
/login
- POST: (emailUsername , password) - Body

/userprojects- For accessing `haveuserpermissionproject` entity
- GET: (user_id, project_id) Returns the permission_level for the user in that project
- POST: (user_id, project_id, permission_level)
- PATCH: (user_id, project_id, permission_id) (e.g. 1, 1, 2).
- DELETE: (project_id, user_id (optional)) Deletes all corresponding project relationships or if user_id specified, 
                                           all project-user relationships 

/issues- For accessing `isues` entity
- GET: (project_id OR issue_id) Returns all issues in project OR details of single issue respectively
- POST: (name, description, priority_level, project_id) - Body. Updates HaveIssue relationship . Returns issue
- PATCH: (name, description, priority_level, project_id) - Body. Returns issue
- DELETE: (issue_id) Deletes haveissue relationships 

/haveissues- For accessing `haveissues` entity
- POST: (project_id, issue_id) 
- DELETE: (project_id OR issue_id) Deletes all issues related to project_id or the specified issue_id depending on parameter 

/havetasks - For accessing `havetasks` entity
- POST: (project_id, task_id). 
- DELETE: (project_id OR task_id) Deletes all tasks related to project_id or the specified task_id depending on parameter 

/in - For accessing `in` entity
- GET: (user_id) Returns corresponding location attributes.
- POST: (user_id, location_id) 
- PATCH: (location_id, user_id) Updates location_id for given user_id
- DELETE: (user_id) Deletes corresponding location relationship 

