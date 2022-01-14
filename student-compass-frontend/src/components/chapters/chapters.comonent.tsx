import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";

import { Chapter,Review } from "../../interfaces/interface";
import Grid from "@mui/material/Grid";
import { Button, Skeleton, Tooltip } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import RatingComponent from "../rating/rating.component";
import StatsComponent from "../stats/stats.component";
import { toast } from "react-toastify";
import CourseService from "../../service/courses.service";

export default function ChaptersAccordion(props: {
  getChapters:  () => Promise<Chapter[]>;
  addDialog: any;
}) {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);

  const [loaded, setLoaded] = React.useState<boolean>(false);

  const refreshPage = React.useCallback(async () => {
    setLoaded(false);
    try {
      const _chapters: Chapter[] = await props.getChapters();
      setChapters(_chapters);
    } catch (e:any) {toast.error(e.message,{})}
    setLoaded(true);
  }, [props]);

  useEffect(() => {
    refreshPage();
  }, [refreshPage]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <h2 style={{ textAlign: "left", margin: 0 }}>Competence</h2>
        </Grid>
        <Grid item xs={8} sx={{ marginBottom: "15px", textAlign: "right" }}>
          <Tooltip title="Refresh">
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginLeft: "5px", marginRight: "5px" }}
              onClick={() => {
                refreshPage();
              }}
            >
              <RefreshIcon />
            </Button>
          </Tooltip>
          {props.addDialog}
        </Grid>
      </Grid>

      {loaded
        ? chapters.map((value, index) => {
            return (
              <ChapterComponent
                title={
                  value.name
                }
                reviews={value.reviews}
                id={value.id}
                moyenne={value.moyenne}
                number_of_reviews={value.number_of_reviews}
              />
            );
          })
        : [1, 2, 3, 4, 5].map((value, index) => {
            return <ChapterComponentSkeleton />;
          })}
    </>
  );
}

const ChapterComponent = (props: { title: any; reviews: Review[],id:string,moyenne:number,number_of_reviews:number }) => {

  const deleteChapter = async () =>{
    try{
      await CourseService.deleteChapter(props.id)
    }
    catch(e:any){
      toast.error(e.message,{})
    }
  }

  return (
    <Grid item xs={12}>
      <Accordion sx={{ marginBottom: "5px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography align="left">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{px:"20px"}}>
          <Grid container>
            <Grid container xs={8}>
              <StatsComponent number_of_reviews={props.number_of_reviews} moyenne={props.moyenne} />
            </Grid>
            <Grid container xs={4}>
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <Button variant="text" color="error" onClick={()=>{deleteChapter()}}>
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <RatingComponent reviews={props.reviews}></RatingComponent>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

const ChapterComponentSkeleton = () => {
  return (
    <Grid item xs={12}>
      <Accordion sx={{ marginBottom: "1px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Skeleton width={200}></Skeleton>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {[1, 2, 3, 4, 5].map((value, index) => {
            return <Skeleton></Skeleton>;
          })}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};
