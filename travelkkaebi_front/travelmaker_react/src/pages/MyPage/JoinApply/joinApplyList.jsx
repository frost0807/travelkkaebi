import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { joinapply } from "../../../config";
import { useState } from "react";
import { bearerToken } from "../../../util";
import { useEffect } from "react";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function JoinApplyList() {
  const [currentPage, setCurrentPage] = useState(1);

  const [checked, setChecked] = useState([]);
  // 신청자 list
  const [application, setApplication] = useState([]);
  // 신청 채택 list
  const [selection, setSelection] = useState([]);

  const appChecked = intersection(checked, application);
  const selectChecked = intersection(checked, selection);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setSelection(selection.concat(application));
    setApplication([]);
  };

  const handleCheckedRight = () => {
    setSelection(selection.concat(appChecked));
    setApplication(not(application, appChecked));
    setChecked(not(checked, appChecked));
  };

  const handleCheckedLeft = () => {
    setApplication(application.concat(selectChecked));
    setSelection(not(selection, selectChecked));
    setChecked(not(checked, selectChecked));
  };

  const handleAllLeft = () => {
    setApplication(application.concat(application));
    setSelection([]);
  };

  useEffect(() => {
    fetchApi();

    return () => fetchApi();
  }, []);
  // 신청자 목록 가져오기
  const fetchApi = async () => {
    const resApi = await axios
      .get(joinapply + "/selectall/bywriterid?pageNo=" + currentPage, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((res) => {
        console.log("신청get ", res);
      });
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(application)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={application.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={appChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={selectChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={selection.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(selection)}</Grid>
    </Grid>
  );
}
