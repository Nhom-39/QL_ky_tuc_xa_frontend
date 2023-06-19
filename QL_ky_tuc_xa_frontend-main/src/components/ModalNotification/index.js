import React from 'react'
import {
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import axios from 'axios';

const styleInput = {
  width: '100%',
}

export default function ModalNotification({ type, value }) {
  const [image, setImage] = React.useState('');
  const [name, setName] = React.useState('');
  const [summaryTitle, setSummaryTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  React.useEffect(() => {
    const data = {
      image: image[0]
    }
    if (image && image !== "") {
      const formData = new FormData();
      formData.append("image", image);
      fetch('http://localhost:9999/upload', {
        method: "post",
        data: formData,
        // headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => console.log(res))
      //   axios.post({
      //     method: "post",
      //     url: "/upload",
      //     data: formData,
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }).then((res)=>console.log(res))
    }
    // console.log(data);
  }, [image]);
  return (
    <Box>
      <Box mb={3}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
        {type !== "view" && <label htmlFor="raised-button-file">
          <Button variant="raised" component="span">
            Upload Image
          </Button>
        </label>}
        <img src={type == "add" ? "" : 'http://localhost:9999/image/' + value?.image} alt={type == "add" ? "avatar" : value?.title} />
      </Box>
      <Box mb={3}>
        <TextField
          InputProps={{
            readOnly: type == "edit" || type == "view" ? true : false,
          }}
          sx={styleInput} id="name" label="Title" defaultValue={type == "add" ? "" : value?.name} variant="outlined" name='name' />
      </Box>
      <Box mb={3}>
        <TextField InputProps={{
          readOnly: type == "edit" || type == "view" ? true : false,
        }}
          sx={styleInput} defaultValue={type == "add" ? "" : value?.summaryTitle}
          id="summaryTitle"
          label="Summary"
          variant="outlined"
          name='summaryTitle' />
      </Box>
      <Box mb={3}>
        <TextField
          multiline
          rows={6}
          defaultValue={type == "add" ? "" : value?.title}
          label="Content"
          sx={styleInput}
          id="title"
          name='title'
          InputProps={{
            readOnly: type == "edit" || type == "view" ? true : false,
          }}
        />
      </Box>
      <Box mb={3}><TextField sx={styleInput}
        defaultValue={type == "add" ? "" : new Date(Date.parse(value?.createdAt))}
        type='date'
        InputProps={{
          readOnly: type == "edit" || type == "view" ? true : false,
        }}
        id="createdAt"
        label="Created at"
        variant="outlined"
        name='createdAt'
        InputLabelProps={{
          shrink: true,
        }} /></Box>
      {(type == "add" || type == "edit") && <Button type="submit">{type == "add" && "Add"}{type == "edit" && "Update"}</Button>}
    </Box>
  )
}
