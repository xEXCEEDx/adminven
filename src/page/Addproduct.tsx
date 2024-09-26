import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles
import '../css/AddProduct.css'; // Import CSS module
import Layout from './layout/layoutside';

const AddProductPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // Add setImageFile here
  
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    // Check if the Quill editor is already initialized
    if (quillRef.current) return;

    quillRef.current = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline'],
          ['image'],
        ],
      },
      theme: 'snow',
    });

    quillRef.current.on('text-change', () => {
      setContent(quillRef.current?.root.innerHTML || '');
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    if (imageFile) {
      formData.append('imagefile1', imageFile);
    }

    try {
      await fetch('', {
        method: 'POST',
        body: formData,
      });
      // Handle success
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <Layout>
    <div className="app-ecommerce container-xxl container-p-y flex-grow">
      <h4 className="py-3 mb-4"><span className="text-muted fw-light">Product /</span> Add Product</h4>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Add Product Details</h5>
            </div>
            <form className="card-body form-about" id="myForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="imageUpload">Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file); // Update imageFile state
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="editor">Content</label>
                <div id="editor" className="text-editor form-control"></div>
                <input type="hidden" name="content" value={content} />
              </div>
              <button type="submit" className="btn btn-primary waves-effect waves-light mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default AddProductPage;
