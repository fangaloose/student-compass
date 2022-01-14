import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Category, Course,Term } from "../../interfaces/interface";
import CategoryService from "../../service/categories.service";

const CoursesGrid = (props: {
  Dialog: JSX.Element;
  getCourse: () => Promise<Course[]>;
  courseLink: string;
  getTermData: () => Promise<Term[]>;
}) => {
  const history = useHistory();

  const [courses, setCourses] = React.useState<Course[]>([]);

  const [loaded, setLoaded] = React.useState<boolean>(false);

  const [term, setTerm] = React.useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = React.useState<string>("");

  const [category, setCategory] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("-1");

  const refreshPage = React.useCallback(async () => {
    setLoaded(false);
    try {
      const _courses: Course[] = await props.getCourse();
      setCourses(_courses);
      const _term: Term[] = await props.getTermData();
      setTerm(_term);
      const _category: Category[] = await CategoryService.getAllCategories();
      setCategory(_category);
    } catch (e:any) {toast.error(e.message,{})}
    setLoaded(true);
  }, [props]);

  useEffect(() => {
    refreshPage();
  }, [refreshPage]);

  useEffect(() => {
    if(term.length>0){setSelectedTerm(term[0].id.toString());};
  }, [term]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTerm(event.target.value);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const courseInActiveTerm = (termArray :Term[]) => {
    for(let i=0;i<termArray.length;i++){
      if(termArray[i].id.toString()===selectedTerm){
        return true;
      }
  }
  return false;

}

  return (
    <Grid container spacing={3} px={"30px"} alignItems={"center"}>
      <Grid item xs={12} md={4} sx={{ marginBottom: "5px", textAlign: "left" }}>
        <FormControl fullWidth>
          <InputLabel variant="standard">Term</InputLabel>
          <Select
            label="Term"
            value={selectedTerm}
            onChange={handleChange}
            variant="standard"
            fullWidth
          >
            {term.map((value, index) => {
              return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4} sx={{ marginBottom: "5px", textAlign: "left" }}>
        <FormControl fullWidth>
          <InputLabel variant="standard">Category</InputLabel>
          <Select
            label="Category"
            value={selectedCategory}
            onChange={handleChange2}
            variant="standard"
            fullWidth
          >
            <MenuItem value={"-1"}>All</MenuItem>
            {category.map((value, index) => {
              return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4} sx={{ marginBottom: "5px", textAlign: "right" }}>
        {props.Dialog}
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: "5px" }}>
        <Divider variant="fullWidth" />
      </Grid>
      {loaded
        ? courses.map((value, index) => (
          ((selectedCategory==="-1" || selectedCategory===value.category ) && courseInActiveTerm(value.terms)) ? (
              <Grid item sm={6} md={4} lg={3}>
                <MyCard
                  title={value.title}
                  description={value.description}
                  onClick={() => {
                    history.push(props.courseLink+"/"+selectedTerm + "/" + value.id);
                  }}
                />
              </Grid>
            ): <></>
        ))
        : [1, 2, 3, 4, 5].map((value, index) => {
            return (
              <Grid item sm={6} md={4} lg={3}>
                <MyCard
                  title={<Skeleton variant="text" />}
                  description={<Skeleton variant="text" />}
                />
              </Grid>
            );
          })}
    </Grid>
  );
};

const MyCard = (props: { title: any; description: any; onClick?: any }) => {
  return (
    <>
      <Card
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        className="Card"
      >
        <CardMedia
          component="img"
          width="100%"
          image="/assets/office-equipment2.jpg"
          alt="Card image cap"
        />
        <CardContent>
          <Typography variant="h5">{props.title}</Typography>
          <Typography variant="body2">{props.description}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CoursesGrid;
