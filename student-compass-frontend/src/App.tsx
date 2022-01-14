import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import MiniDrawerAdmin from "./components/drawer/drawerAdmin.component";
import MiniDrawerStudent from "./components/drawer/drawerStudent.component";

import MiniDrawerTeacher from "./components/drawer/drawerTeacher.component";

import AdminRouterComponent from "./routes/admin.route";
import StudentRouterComponent from "./routes/student.route";
import TeacherRouterComponent from "./routes/teacher.route";
import UnAuthRouterComponent from "./routes/unauth.route";

function App() {
  const role = useAppSelector((state: RootState) => state.user.role);

  if(role==='teacher'){
    return (<Teacher></Teacher>);
  }

  if(role==='admin'){
    return (<Admin></Admin>);
  }

  if(role==='student'){
    return (<Student></Student>);
  }

  return (<UnAuth></UnAuth>);
  
}

const UnAuth=()=>{
  localStorage.setItem('token', "");
  return (
    <div className="App">
      <Router>
        <UnAuthRouterComponent></UnAuthRouterComponent>
      </Router>
    </div>
  );
}

const Teacher=()=>{
  return (
    <div className="App">
      <Router>
      <MiniDrawerTeacher>
        <TeacherRouterComponent></TeacherRouterComponent>
      </MiniDrawerTeacher>
      </Router>
    </div>
  );
}

const Admin=()=>{
  return (
    <div className="App">
      <Router>
      <MiniDrawerAdmin>
        <AdminRouterComponent></AdminRouterComponent>
      </MiniDrawerAdmin>
      </Router>
    </div>
  );
}

const Student=()=>{
  return (
    <div className="App">
      <Router>
      <MiniDrawerStudent>
        <StudentRouterComponent></StudentRouterComponent>
      </MiniDrawerStudent>
      </Router>
    </div>
  );
}

export default App;
