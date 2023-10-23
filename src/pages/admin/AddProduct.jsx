import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  Form,
  FormGroup,   
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { getCategories } from "../../services/category.service";
import {
  addProductImage,
  createProductInCategory,
  createProductWithOutCategory,
} from "../../services/product.service";
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    image: undefined,
    imagePreview: undefined,
  });

  const [categories, setCategories] = useState(undefined);

  const [selectedCategoryId, setSelectedCategoryId] = useState("none");

  //for rich text editor
  const editorRef = useRef();

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error loading categories !!");
      });
  }, []);

  const handleFieldChange = (event, property) => {
    setProduct({
      ...product,
      [property]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      if (
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpeg"
      ) {
        const reader = new FileReader();
        reader.onload = (r) => {
          setProduct({
            ...product,
            imagePreview: r.target.result,
            image: event.target.files[0],
          });
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        toast.error("Invalid File !!");
        setProduct({
          ...product,
          image: undefined,
          imagePreview: undefined,
        });
      }
    }
  };

  const clearData = () => {

    editorRef.current.setContent("");

    setProduct({
        title: "",
        description: "",
        price: 0,
        discountedPrice: 0,
        quantity: 1,
        live: false,
        stock: true,
        image: undefined,
        imagePreview: undefined,
      });
  };

  const submitAddProductFrom = (event) => {
    event.preventDefault();
    if (product.title === undefined || product.title.trim() === "") {
      toast.error("Title is required !!");
      return;
    }
    if (
      product.description === undefined ||
      product.description.trim() === ""
    ) {
      toast.error("Description is required !!");
      return;
    }
    if (product.price <= 0) {
      toast.error("Invalid price !!");
      return;
    }
    if (
      product.discountedPrice <= 0 ||
      product.discountedPrice > product.price
    ) {
      toast.error("Invalid discounted price !!");
      return;
    }

    if (selectedCategoryId === "none") {
      //API call: add product without category
      createProductWithOutCategory(product)
        .then((data) => {
          console.log(data);

          if (product.image) {
            //image upload
            addProductImage(product.image, data.productId)
              .then((data) => {
                console.log(data);
                toast.success("Image uploaded !!");
              })
              .catch((error) => {
                console.log(error);
                toast.error("Error is uploading Image !!");
              });
          }

          toast.success("Product is created !!");
          clearData();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error is creating product !!");
        });
    } else {
      //create product with category
      createProductInCategory(product, selectedCategoryId)
        .then((data) => {
          console.log(data);

          if (product.image) {
            //image upload
            addProductImage(product.image, data.productId)
              .then((data) => {
                console.log(data);
                toast.success("Image uploaded !!");
              })
              .catch((error) => {
                console.log(error);
                toast.error("Error is uploading Image !!");
              });
          }

          toast.success("Product is created !!");
          clearData();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error is creating product !!");
        });
    }
  };

  const formView = () => {
    return (
      <>
        <Card className="shadow">
          <Card.Body>
            <h5>Add Product here </h5>
            {/* {JSON.stringify(product)} */}
            <Form onSubmit={submitAddProductFrom}>
              {/* Product title */}
              <FormGroup className="mt-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={product.title}
                  onChange={(event) => handleFieldChange(event, "title")}
                />
              </FormGroup>

              {/* Product description */}
              <FormGroup className="mt-3">
                <Form.Label>Product Description</Form.Label>

                <Editor
                  // apiKey=""
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Write product description here</p>"
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={() =>
                    setProduct({
                      ...product,
                      description: editorRef.current.getContent(),
                    })
                  }
                />

                {/* <Form.Control 
                            as={'textarea'} 
                            placeholder="Enter here"
                            rows={6}
                            value={product.description}
                            onChange={(event)=>handleFieldChange(event,'description')}/> */}
              </FormGroup>

              {/* Product price */}
              <Row>
                <Col>
                  <FormGroup className="mt-3">
                    <Form.Label>Price (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      value={product.price}
                      onChange={(event) => handleFieldChange(event, "price")}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="mt-3">
                    <Form.Label>Discounted Price (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      value={product.discountedPrice}
                      onChange={(event) =>
                        handleFieldChange(event, "discountedPrice")
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>

              {/* Product quantity */}
              <FormGroup className="mt-3">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter here"
                  value={product.quantity}
                  onChange={(event) => handleFieldChange(event, "quantity")}
                />
              </FormGroup>

              <Row className="mt-3 ps-2">
                <Col>
                  <Form.Check
                    type="switch"
                    label="Live"
                    checked={product.live}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        live: !product.live,
                      })
                    }
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="switch"
                    label="Stock"
                    checked={product.stock}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        stock: !product.stock,
                      })
                    }
                  />
                </Col>
              </Row>

              <FormGroup className="mt-3">
                <Container
                  hidden={!product.imagePreview}
                  className="text-center"
                >
                  <p className="text-muted">Image Preview</p>
                  <img
                    className="image-fuild"
                    style={{
                      maxHeight: "250px",
                      border: "2px solid black",
                    }}
                    src={product.imagePreview}
                    alt=""
                  ></img>
                </Container>
                <Form.Label className="mt-3">Product Image</Form.Label>
                <Form.Control
                  type={"file"}
                  onChange={(event) => handleFileChange(event)}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Select Category</Form.Label>
                <Form.Select
                  value={selectedCategoryId}
                  onChange={(event) =>
                    setSelectedCategoryId(event.target.value)
                  }
                >
                  {categories ? (
                    <>
                      <option value="none">None</option>
                      {categories.content.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.title}
                        </option>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </Form.Select>
              </FormGroup>

              <Container className="text-center mt-3">
                <Button type="submit" variant="success">
                  Add Product
                </Button>
                <Button
                  variant="warning"
                  className="ms-3 ps-3 pe-3"
                  onClick={clearData}
                >
                  Clear Data
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <>{formView()}</>;
};

export default AddProduct;
