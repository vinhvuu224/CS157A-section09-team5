import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import ProjectPopup from '../popups/ProjectPopup';
import { getProjects } from '../../actions/projects';
import { addProject } from '../../actions/projects';
import { editProject } from '../../actions/projects';
import { deleteProject } from '../../actions/projects';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Chip } from '@material-ui/core';
import { addProjectUsers } from '../../actions/projectUsers';
import { deleteProjectUsers } from '../../actions/projectUsers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [projects, setProjects] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [projectKey, setProjectKey] = useState(0);
  const [buttonTitle, setButtonTitle] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [userKey, setUserKey] = useState(0);
  const [permissionLevel, setPermissionLevel] = useState('');

  const [chipData, setChipData] = useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  useEffect(() => {
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    getProjects(user_id)
      .then((res) =>
        res.map((obj) => ({
          key: obj.project_id,
          name: obj.project_name,
          permission: obj.permission_level,
        }))
      )
      .then((res) => setProjects(res));
  }, []);

  // const testing = JSON.parse(localStorage.getItem('user_id'));
  // console.log("This is the user_id: ", testing)
  // const testing2 = JSON.stringify(localStorage.getItem('userEmail'));
  // console.log("This is the userEmail: ", testing2)
  // const testing3 = JSON.stringify(localStorage.getItem('userUsername'));
  // console.log("This is the userUsername: ", testing3)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClickDeleteButton = (projectKey) => {
    setProjectKey(projectKey);
  };

  const onClickDeleteUserButton = (userKey) => {
    setUserKey(userKey);
  };

  const onClickEditButton = (title) => {
    setButtonTitle(title);
  };

  const onClickAddButton = (title) => {
    setButtonTitle(title);
    console.log(title);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  let history = useHistory();
  function nextPage(e) {
    history.push({ pathname: '/Storyboard', projectName: e });
  }

  const grabUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const grabUsernameInput = (e) => {
    setUsernameInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (buttonTitle === 'Add') {
      const username = localStorage.getItem('userUsername');
      const res = await addProject(userInput, username);
      const newProject = {
        key: res.project_id,
        name: res.project_name,
        permission: 'Full',
      };
      const listOfProjects = projects;
      listOfProjects.push(newProject);
      setProjects([...listOfProjects]);
    } else if (buttonTitle === 'Edit') {
      const username = JSON.stringify(localStorage.getItem('userUsername'));
      await editProject(projectKey, userInput, username);
      const items = projects;
      items.map((item) => {
        if (item.key === projectKey) {
          item.name = userInput;
        }
      });
      setProjects([...items]);
    } else if (buttonTitle === 'Add User') {
      const username = usernameInput;
      await addProjectUsers(username, projectKey, permissionLevel);
    } else {
      await deleteProject(projectKey);
      const filteredItems = projects.filter((item) => item.key !== projectKey);
      setProjects([...filteredItems]);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction='column'>
        <Grid item xs={12} container>
          <Grid item xs={4} />
          <motion.div
            initial={{ opacity: 0, y: 120, x: 120 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Paper elevation={3}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h3>Your Projects</h3>
                <IconButton
                  aria-label='Add'
                  color='primary'
                  onClick={(e) => {
                    e.preventDefault();
                    setTitle('Adding Project');
                    setDescription('Please name your project here.');
                    handleClickOpen();
                  }}
                >
                  <AddIcon
                    onClick={() => {
                      onClickAddButton('Add');
                    }}
                  />
                </IconButton>
              </div>
              <Divider />
              <List style={{ overflowY: 'auto', height: '500px' }}>
                {projects.map((project) => {
                  return (
                    <div>
                      <ListItem>
                        <ListItem
                          className={classes.listItem}
                          button
                          onClick={(e) => {
                            e.preventDefault();
                            nextPage({
                              projectname: project.name,
                              projectkey: project.key,
                              permission: project.permission,
                            });
                          }}
                        >
                          <ListItemText
                            primary={project.name}
                            style={{ maxWidth: 290 }}
                          />
                        </ListItem>
                        {project.permission === 'Full' ? (
                          <div>
                            <IconButton
                              aria-label='Edit'
                              color='primary'
                              onClick={(e) => {
                                e.preventDefault();
                                setTitle('Editing Project');
                                setDescription(
                                  'Please rename your project here.'
                                );
                                handleClickOpen();
                              }}
                            >
                              <CreateIcon
                                onClick={() => {
                                  onClickDeleteButton(project.key);
                                  onClickEditButton('Edit');
                                }}
                              />
                            </IconButton>
                            <IconButton
                              aria-label='Add'
                              color='secondary'
                              onClick={(e) => {
                                e.preventDefault();
                                setTitle('Deleting Project');
                                setDescription(
                                  'Are you sure you want to delete your project?'
                                );
                                handleClickOpen();
                              }}
                            >
                              <DeleteIcon
                                onClick={() => {
                                  onClickDeleteButton(project.key);
                                  onClickAddButton('Delete');
                                }}
                              />
                            </IconButton>
                            <IconButton
                              aria-label='Add'
                              color='primary'
                              onClick={(e) => {
                                e.preventDefault();
                                setTitle('Collaborate With Other Users');
                                setDescription(
                                  'Please enter a username and select a priority level.'
                                );
                                onClickAddButton('Add User');
                                handleClickOpen();
                              }}
                            >
                              <GroupAddIcon
                                onClick={() => {
                                  onClickDeleteButton(project.key);
                                }}
                              />
                            </IconButton>
                          </div>
                        ) : (
                          <></>
                        )}
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </Paper>
            <ProjectPopup
              title={title}
              open={open}
              description={description}
              handleClose={handleClose}
              onSubmit={onSubmit}
              grabUserInput={grabUserInput}
              userInput={userInput}
              grabUsernameInput={grabUsernameInput}
              usernameInput={usernameInput}
              setPermissionLevel={setPermissionLevel}
              permissionLevel={permissionLevel}
            ></ProjectPopup>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
