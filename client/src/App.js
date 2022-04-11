import React, { useState } from 'react';
// import axios from 'axios';
const App = () => {
  const [id, setID] = useState("");
  const [image, setImage] = useState([]);

  const onSub = (e) => {
    console.log("ID" ,id )  
    console.log("image ", image[0])  

    let formData = new FormData();
    formData.append("file", image[0])
    // formData.append("docimg",lastimage[0])
    formData.append("upload_preset", "blogpost")

    // axios.post("http://localhost:5000/", formData
    // ).then((response) => {
    //   const oneimg = response;
    //   console.log(oneimg)

    //   axios.post("http://localhost:5000/upload", {
    //     id: id,
    //     image: oneimg
    //   });
    // });

    e.preventDefault()
  }

  return (
    <>
      <div className="box ">
        <div className="container ">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12 mx-auto" id="formdata">
              <form onSubmit={onSub} >
                <div className="form-group">
                  <label htmlFor="">ID:</label>
                  <input type="number" className="form-control"
                    placeholder="Enter Id" id="id" name="id" value={id}
                    onChange={(e) => setID(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label htmlFor="">Upload Profile Image:</label>
                  <input type="file" name="file" className="form-control"
                    onChange={(e) => setImage(e.target.files)} required />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;



