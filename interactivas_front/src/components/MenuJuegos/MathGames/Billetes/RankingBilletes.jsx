import React from "react";
import RankingTable from "../../Ranking/CustomComponent/RankingTable";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "@emotion/styled";


const RankingContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
`;

const RankingBilletes = ({userGamePoint}) => {
   if (userGamePoint < 0) {
      return (
         <div>
             <RankingContainer>
                 <h1>¡La proxima te ira mejor!</h1>
                 <h1>No te preocupes, podes volver a jugar cuando quieras</h1>
                 <h1>Tu puntaje final fue de {userGamePoint}</h1>
                 <RankingTable/>
                 <br />
                 <Button component={Link} to="/games">Volver</Button>
             </RankingContainer>
         </div>
     )
   } else {
      return (
         <div>
             <RankingContainer>
                 <h1>¡Terminaste!</h1>
                 <h1>Tu puntaje final fue de {userGamePoint}</h1>
                 <RankingTable />
                 <br />
                 <Button component={Link} to="/games">Volver</Button>
             </RankingContainer>
         </div>
     )
   }
    
};

export default RankingBilletes;
