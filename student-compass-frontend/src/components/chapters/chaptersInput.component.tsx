import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";

import { ChapterStudent } from "../../interfaces/interface";
import Grid from "@mui/material/Grid";
import { Button, Skeleton, TextField, Tooltip } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import RateComponent from "../rating/rate.component";
import { toast } from "react-toastify";
import CourseService from "../../service/courses.service";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useParams } from "react-router-dom";

export default function ChaptersReview(props: {
  getChapters:  () => Promise<ChapterStudent[]>;
  addDialog: any;
}) {
  const [chapters, setChapters] = React.useState<ChapterStudent[]>([]);

  const [loaded, setLoaded] = React.useState<boolean>(false);

  const refreshPage = React.useCallback(async () => {
    setLoaded(false);
    try {
      const _chapters: ChapterStudent[] = await props.getChapters();
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
        <Grid item xs={6}>
          <h2 style={{ textAlign: "left", margin: 0 }}>Competence</h2>
        </Grid>

        <Grid item xs={6} sx={{ marginBottom: "15px", textAlign: "right" }}>
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
        <Grid item xs={12}>
          <i style={{ textAlign: "center" }}>
            Your reviews are sent anonymously.
          </i>
        </Grid>
      </Grid>

      {loaded
        ? chapters.map((value, index) => {
            return (
              <ChapterComponent
                title={
                  value.name
                }
                id={value.id}
                isReviewed={value.isReviewed}
              />
            );
          })
        : [1, 2, 3, 4, 5].map((value, index) => {
            return <ChapterComponentSkeleton />;
          })}
    </>
  );
}

const ChapterComponent = (props: { title: any,isReviewed:boolean,id:string }) => {
  const [starValue, setStarValue] = React.useState<number | null>(5);
  const [text, setText] = React.useState<string>('');
  const studentid: string = useAppSelector((state: RootState) => state.user.id);

  const {termId}:any = useParams();

  const submitFeedBack = async ()=> {

    try{
      if(starValue){
        await CourseService.postReview(props.id,termId,studentid,starValue.toString(),text)
      } 
    }
    catch(e:any){
      toast.error(e.message,{})
    }
    
  }
  
  return (
    <Grid item xs={12}>
      <Accordion sx={{ marginBottom: "5px" }} disabled={props.isReviewed}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography align="left">{props.title}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails sx={{ px: "20px" }}>
          <RateComponent setStarValue={setStarValue}></RateComponent>
          <TextField
            autoFocus
            margin="dense"
            id="chapterreview"
            label="Competence Review"
            type="text"
            fullWidth
            multiline
            rows={4}
            onChange={(e) => { setText(e.target.value) }}
          />

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button sx={{ marginTop: "10px" }} variant="contained" onClick={()=>{submitFeedBack() } }>
              Submit
            </Button>
          </Grid>
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
