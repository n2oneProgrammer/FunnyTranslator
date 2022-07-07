import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import multiTranslator from "../scripts/multiTranslator";
import Languages from "../scripts/languages";

function PathTable() {
  let rows = multiTranslator.translationSteps;
  const langSymbol2Name = (symbol: Languages) => {
    let index = Object.values(Languages).findIndex(s => s === symbol);
    if (index != null) {
      return Object.keys(Languages)[index];
    }
    return ""
  }
  return (
    <Paper style={{
      marginTop: 10,
      padding: 15,
      display: "flex",
    }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Lp.</TableCell>
            <TableCell>language</TableCell>
            <TableCell>text</TableCell>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow>
                <TableCell>{index}</TableCell>
                <TableCell>{langSymbol2Name(row.language)}</TableCell>
                <TableCell>{row.text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default PathTable;