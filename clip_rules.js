function cant_walk_through(collision)
{
  if (collision == "bottom")
    {
        map_pos_y -= vel_y;
        player_y += vel_y;
        if(keys[83])
        {
          map_pos_y += vel_y;
          player_y -= vel_y;
        }
    }
    if (collision == "top")
    {
        map_pos_y -= vel_y;
        player_y += vel_y;
        if(keys[87])
        {
          map_pos_y += vel_y;
          player_y -= vel_y;
        }
    }
    if (collision == "left")
    {
        map_pos_x += vel_x;
        player_x -= vel_x;
        if(keys[65])
        {
          map_pos_x -= vel_x;
          player_x += vel_x;
        }
    }
    if (collision == "right")
    {
        map_pos_x += vel_x;
        player_x -= vel_x;
        if(keys[68])
        {
          map_pos_x -= vel_x;
          player_x += vel_x;
        }
    }
}


function collision(x1, y1, w1, h1, wall_x, wall_y, w = 64, h = 64, walkthrough = 0) 
{
  var dx = (x1 + w1 / 2) - (wall_x + w / 2);
  var dy = (y1 + h1 / 2) - (wall_y + h / 2);
  var width = (w1 + w) / 2;
  var height = (h1 + h) / 2;
  var crossWidth = width * dy;
  var crossHeight = height * dx;
  var collision='none';
  //
  if(Math.abs(dx) <= width && Math.abs(dy) <= height)
  {
    if(crossWidth > crossHeight)
    {
      collision = ( crossWidth > (-crossHeight)) ? 'bottom' : 'left';
    }
    else
    {
      collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';
    }
  }
  if(walkthrough == 0)
  {
    cant_walk_through(collision);
  }
  return (collision);
}


function wall_clip()
{
  var x = 0;
   while (player.walls[x])
    {
      collision(player_x, player_y, 64, 64, player.walls[x].x, player.walls[x].y, 2, 2);
      x++;
    }
}

function bullet_hit_wall()
{
  var x = 0;
  var y = 0;
  var collide = "none";
   while (player.walls[x])
   {
    y = 0;
    while(player.bullets[y])
    {      
     collide =  collision(player.bullets[y].x, player.bullets[y].y, 16, 16, player.walls[x].x, player.walls[x].y, 32, 32, 1);
      if (collide == "left")
      {
          player.bullets[y].x -= 20;
          player.bullets[y].timer++;
      }
        if (collide == "right"){
            player.bullets[y].x += 20;
            player.bullets[y].timer++;
        }
        if (collide == "bottom"){
            player.bullets[y].y += 20;
            player.bullets[y].timer++;
        }
        if (collide == "top"){
            player.bullets[y].y -= 20;
            player.bullets[y].timer++;
        }
        y++;
    }
    x++;
  }

}