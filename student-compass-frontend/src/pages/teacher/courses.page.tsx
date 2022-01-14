import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import CoursesGrid from "../../components/cards/cardGrid.component";
import AddCourseDialog from "../../components/dialogs/addCourseDialog.component";

import TermService from "../../service/terms.service";
import UserService from "../../service/users.service";


const CoursesPage = () => {

  const id: string = useAppSelector((state: RootState) => state.user.id);

  return (
    <CoursesGrid Dialog={<AddCourseDialog />} getCourse={()=>(UserService.getCourse(id))} courseLink="/courses" getTermData={TermService.getAllTerms}></CoursesGrid>
  );
};

export default CoursesPage;