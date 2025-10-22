import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocations } from "../context/LocationContext";
import "./../App.css";

const LocationList = () => {
  const { locations, removeLocation } = useLocations();

  const handleRemove = (id) => {
    removeLocation(id);
  };

  return (
    <div className="location-list-wrapper">
      <h2 className="location-list-title">Збережені локації</h2>
      <List>
        {locations.map((location) => (
          <ListItem
            key={location.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(location.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={location.name}
              secondary={location.createdAt ? `${new Date(location.createdAt).toLocaleString()}` : null}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LocationList;
