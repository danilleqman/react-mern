import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export const LinkCard = ({ link }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          карточка
        </Typography>
        <Typography color="textSecondary">
          {"Ваша ссылка: "}
          <Link href={link.from} color="inherit">
            {link.from}
          </Link>
        </Typography>
        <Typography color="textSecondary">
          {"Откуда: "}
          <Link href={link.to} color="inherit">
            {link.to}
          </Link>
        </Typography>
        <Typography color="textSecondary">
          {`Количество кликов ${link.clicks}`}
        </Typography>
        <Typography color="textSecondary">
          {`Дата создания ${link.date}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
