  import './App.css';
  import * as React from 'react';
  import Switch from '@mui/material/Switch';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import { styled, useTheme } from '@mui/material/styles';
  import Drawer from '@mui/material/Drawer';
  import CssBaseline from '@mui/material/CssBaseline';
  import MuiAppBar from '@mui/material/AppBar';
  import Toolbar from '@mui/material/Toolbar';
  import List from '@mui/material/List';
  import Divider from '@mui/material/Divider';
  import IconButton from '@mui/material/IconButton';
  import MenuIcon from '@mui/icons-material/Menu';
  import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
  import ChevronRightIcon from '@mui/icons-material/ChevronRight';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';  
  import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
  import { useEffect,useState } from 'react';
  import axios from 'axios';
  import Aos from 'aos'
  import 'aos/dist/aos.css'
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import { ThemeProvider, createTheme } from '@mui/material/styles';
  import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';




  //------------------------Sidebar----------------------------------------------------------

  const drawerWidth = 240;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  function PersistentDrawerLeft({title,setChosenData,setship}) {
    const chosen = (data) =>{
      setChosenData(data)
      setship(true)
    }
    const makeButton = (data) =>{
      return(
        <ListItem key={data.id} disablePadding>
        <ListItemButton onClick={() => chosen(data)} >
          <ListItemIcon>
            <TipsAndUpdatesIcon /> 
          </ListItemIcon>
          <ListItemText primary={data.title} />
        </ListItemButton>
      </ListItem>
      )
    }

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{background: 'transparent',boxShadow: 'none',zIndex:0}} open={open}>
          <Toolbar className="bar" >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon sx={{color:"black", backgroundColor:"grey"}} />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
          <Typography variant="h6" noWrap component="div">
            Content from API
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {/* {title.map((makeButton,this))} */}
            {title.map((title) => makeButton(title))}
          </List>
          <Divider />
        </Drawer>
        </Box>
    );
    }


  //----------------------------- Dark Mode Toggle Switch----------------------------------------------

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#66a3ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  //-----------------------------------card------------------------------------

  function BasicCard({ chosenData }) {
    var ex;
  try{
    const object=JSON.parse(chosenData.notes)
    const extractTextFromObject=(obj)=> {
      let text = '';  
    
      if (obj.content) {
        obj.content.forEach((item) => {
          if (item.type === 'paragraph') {
            if (item.content && item.content.length > 0) {
              item.content.forEach((subItem) => {
                if (subItem.type === 'text') {
                  text += subItem.text;
                }
              });
            }
          } else if (item.content) {
            text += extractTextFromObject(item);
          }
        });
      }
      return text
    }

    ex=extractTextFromObject(object);
  }
  catch(error){
    ex="No Notes Found"
  }

    return (
      <div data-aos="fade-left" data-aos-duration="2000" className='splashbk'>
        <Card sx={{ minWidth: 300,width:300, height:200,position:'absolute',right:30,top:-70,overflow:"auto" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              id : {chosenData.id} | user : {chosenData.user}
            </Typography>
            <Typography variant="h5" component="div">
              {chosenData.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {chosenData.category}
            </Typography>
            <Typography variant="body2">
              {ex}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  //---------------------------------------APP--------------------------------------------------

  function App() {

    

  const [darkMode,setDarkMode] =useState(false);
  const darkTheme = createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light'
      },
    });
  const [title,settitles] = useState([]);
  const [ship,setship] = useState(false);
  const [load,loader] = useState(true);
  const [chosenData, setChosenData] = useState([]);

  useEffect(function(){
    Aos.init();
    axios.get('https://api.gyanibooks.com/library/get_dummy_notes/').then((res) =>{
      settitles(res.data);
      loader(false);
    })
  },[]);

    return (
      load ? <div className="center"> loading </div> :
      <div style={{backgroundColor: darkMode ? "#000000":"#eeeeee"}} className="body">
        <ThemeProvider theme={darkTheme}>
        <p checked={darkMode} onChange={() => setDarkMode(!darkMode)} className='modeswitch'>{<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}</p> 
        <CssBaseline />
  
        <div className="square">
          <span style={{borderColor: darkMode ? "#eeeeee":"#000000"}} ></span>
          <span style={{borderColor: darkMode ? "#eeeeee":"#000000"}}></span>
          <span style={{borderColor: darkMode ? "#eeeeee":"#000000"}}></span>
        </div>
        
        <div className="sidebar">
          <PersistentDrawerLeft title={title} setChosenData={setChosenData} setship={setship} />
        </div>

        <div className="bottom">
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
        </div>

        <div data-aos="zoom-out-up" data-aos-duration="1000" className="content">
          <p style={{color: darkMode ? "#eeeeee":"#000000"}} className="Greetings">Bonjour!</p>
        </div>

        {ship ? <BasicCard  chosenData={chosenData}/>:undefined}

        <p className="closebtn">
          <IconButton onClick={() => setship(false)}>
            <CancelTwoToneIcon />
          </IconButton>
        </p>

      </ThemeProvider>
      </div>
    );
  }

  export default App;
