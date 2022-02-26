import {
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormTitleBar from "../../components/ui/FormTitleBar";
import { fetchSetting } from "../../services/setting.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";
import { SettingType } from "../../types/Setting.type";

export default function SettingPage() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.setting.settings);
  const [triggerState, setTriggerState] = useState(false);
  const [data, setData] = useState<SettingType[]>([]);

  useEffect(() => {
    if (settings.length < 1)
      dispatch(fetchSetting({}))
        .unwrap()
        .catch((e) => {
          dispatch(showToast({ message: e.errorMessage, type: "error" }));
        })
        .then(() => {
          setTriggerState((x) => !x);
        });
  }, []);

  useEffect(() => {
    setData(
      settings.map((x) => ({ id: x.id, props: x.props, value: x.value }))
    );
  }, [triggerState]);

  const changeDataHandler = (vals: string, props: string) => {
    setData((x) => {
      let idx = x.findIndex((x) => x.props === props);
      if (idx === -1) x.push({ value: vals, props });
      else x[idx].value = vals;
      return [...x];
    });
  };

  const saveDataHandler = () => {
    console.log(data);
  };

  return (
    <>
      <FormTitleBar
        title="Settings"
        viewMode="create"
        handlerBackButton={() => {}}
        breadcrumbs={[{ label: "Settings" }]}
        isView={false}
        handlerCreateButton={saveDataHandler}
      />
      <Grid container sx={{ mt: 4 }}>
        <Grid item md={6} sm={12}>
          <Card variant="outlined" sx={{ p: 1 }}>
            <CardContent>
              <Typography variant="h6">Points</Typography>
              <Divider variant="fullWidth" orientation="horizontal" />
              <Grid container sx={{ mt: 1 }}>
                <Grid item md={2} />
                <Grid
                  item
                  md={4}
                  display={{ xs: "none", md: "block" }}
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="button">Read Article</Typography>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    placeholder="Read Article Points"
                    size="small"
                    value={
                      data.filter((x) => x.props === "read-point")[0]?.value ||
                      ""
                    }
                    onChange={(e) => {
                      changeDataHandler(e.target.value, "read-point");
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 1 }}>
                <Grid item md={2} />
                <Grid
                  item
                  md={4}
                  display={{ xs: "none", md: "block" }}
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="button">Points per Question</Typography>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    placeholder="Quiz Points"
                    size="small"
                    value={
                      data.filter((x) => x.props === "quiz-point")[0]?.value ||
                      ""
                    }
                    onChange={(e) => {
                      changeDataHandler(e.target.value, "quiz-point");
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
