import {
  Button,
  Card,
  Container,
  Table,
  Form,
  FormGroup,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { AiFillEye } from "react-icons/ai";
import {
  deleteProduct,
  updateProductCategory,
  updateProductImage,
} from "../../services/product.service";
import Swal from "sweetalert2";
import { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { getProductImageUrl } from "../../services/helper.service";
import ShowHtml from "../ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import { getCategories } from "../../services/category.service";
import { updateProduct as updateProductAPI } from "../../services/product.service";

const SingleProductView = ({
  index,
  product,
  updateProductList,
  products,
  setProducts,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [categories, setCategories] = useState(null);

  //for modal update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);

  const [imageUpdate, setImageUpdate] = useState({
    image: undefined,
    imagePreview: undefined,
  });
  const [categoryChangeId, setCategoryChangeId] = useState("");

  const updateFieldHandler = (event, property) => {
    setUpdateProduct({
      ...updateProduct,
      [property]: event.target.value,
    });
  };

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateFromSubmit = (event) => {
    event.preventDefault();
    console.log(updateProduct);
    if (
      updateProduct.title === undefined ||
      updateProduct.title.trim() === ""
    ) {
      toast.error("Title is required !!");
      return;
    }
    if (
      updateProduct.description === undefined ||
      updateProduct.description.trim() === ""
    ) {
      toast.error("Description is required !!");
      return;
    }
    if (updateProduct.price <= 0) {
      toast.error("Invalid price !!");
      return;
    }
    if (
      updateProduct.discountedPrice <= 0 ||
      updateProduct.discountedPrice > updateProduct.price
    ) {
      toast.error("Invalid discounted price !!");
      return;
    }

    updateProductAPI(updateProduct, updateProduct.productId)
      .then((data) => {
        console.log(data);

        //update product category
        if(categoryChangeId && categoryChangeId!==updateProduct.category?.categoryId){
          updateProductCategory(categoryChangeId,updateProduct.productId)
          .then((data)=>{
            console.log(data)

            setUpdateProduct({
                ...updateProduct,
                category: data.category
            })

            const newArray = products.content.map((p) => {
                if (p.productId === updateProduct.productId) return data;

                return p;
              });
              setProducts({
                ...products,
                content: newArray,
              });


          }).catch(error=>{
            console.log(error)
             toast.error("Error in updating category", {
                position: "top-right"
                })
          })
        } 

        //update category
        if (imageUpdate.image && imageUpdate.imagePreview) {
          updateProductImage(imageUpdate.image, updateProduct.productId)
            .then((imageData) => {
              console.log(imageData);
              console.log("Image updated");

              setImageUpdate({
                image: undefined,
                imagePreview: undefined
              })
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in updating image", {
                position: "top-right"
              });
            });
        }

        const newArray = products.content.map((p) => {
          if (p.productId === updateProduct.productId) return data;

          return p;
        });
        setProducts({
          ...products,
          content: newArray,
        });
        handleCloseUpdate();
        toast.success("Product Updated");
      })
      .catch(error=> {
        console.log(error);
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
          setImageUpdate({
            imagePreview: r.target.result,
            image: event.target.files[0],
          });
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        toast.error("Invalid File !!");
        setImageUpdate({
          image: undefined,
          imagePreview: undefined,
        });
      }
    }
  };

  //for rich text editor
  const editorRef = useRef();

  const deleteProductLocal = (productId) => {
    // alert(productId)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId)
          .then((data) => {
            console.log(data);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            updateProductList(productId);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error while deleting products.");
          });
      }
    });
  };

  const formatDate = (time) => {
     return new Date(time).toLocaleDateString();
  };

  const getBackgroundForProduct = () => {
    //Live + Stock ==> green: table-success

    //not live ==> red: table-danger

    //not Stock ==> yellow: table-warning
    if (product.live && product.stock) {
      return "table-success";
    } else if (!product.live) {
      return "table-danger";
    } else if (!product.stock) {
      return "table-warning";
    } else {
    }
  };

  //modal view
  const viewProductModalView = () => {
    return (
      selectedProduct && (
        <>
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card>
                <Card.Body>
                  {/* image */}
                  <Container className="text-center">
                    <img
                      style={{
                        height: "200px",
                      }}
                      src={getProductImageUrl(selectedProduct.productId)}
                    />
                  </Container>

                  <Table
                    bordered
                    responsive
                    striped
                    className="mt-3 text-center"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "50%" }}>Info</th>
                        <th style={{ width: "50%" }}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Quantity</td>
                        <td>{selectedProduct.quantity}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>₹{selectedProduct.price}</td>
                      </tr>
                      <tr>
                        <td>Discounted Price</td>
                        <td>₹{selectedProduct.discountedPrice}</td>
                      </tr>
                      <tr>
                        <td>Live</td>
                        <td>{selectedProduct.live ? "True" : "False"}</td>
                      </tr>
                      <tr>
                        <td>Stock</td>
                        <td>
                          {selectedProduct.stock ? "In Stock" : "Not in Stock"}
                        </td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>
                          {selectedProduct.category?.title
                            ? selectedProduct.category?.title
                            : "None"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* description */}
                  <div className="p-3 mt-3 border border-2">
                    <ShowHtml htmlText={selectedProduct.description} />
                  </div>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  const openEditProductModal = () => {
    return (
      updateProduct && (
        <>
          <Modal size="lg" show={showUpdate} onHide={handleCloseUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Product title */}
                <FormGroup className="mt-3">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter here"
                    value={updateProduct.title}
                    onChange={(event) => updateFieldHandler(event, "title")}
                  />
                </FormGroup>

                {/* Product description */}
                <FormGroup className="mt-3">
                  <Form.Label>Product Description</Form.Label>

                  <Editor
                    // apiKey=""
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={updateProduct.description}
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
                      setUpdateProduct({
                        ...updateProduct,
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
                        value={updateProduct.price}
                        onChange={(event) => updateFieldHandler(event, "price")}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="mt-3">
                      <Form.Label>Discounted Price (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter here"
                        value={updateProduct.discountedPrice}
                        onChange={(event) =>
                          updateFieldHandler(event, "discountedPrice")
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
                    value={updateProduct.quantity}
                    onChange={(event) => updateFieldHandler(event, "quantity")}
                  />
                </FormGroup>

                <Row className="mt-3 ps-2">
                  <Col>
                    <Form.Check
                      type="switch"
                      label="Live"
                      checked={updateProduct.live}
                      onChange={(event) =>
                        setUpdateProduct({
                          ...updateProduct,
                          live: !updateProduct.live,
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="switch"
                      label="Stock"
                      checked={updateProduct.stock}
                      onChange={(event) =>
                        setUpdateProduct({
                          ...updateProduct,
                          stock: !updateProduct.stock,
                        })
                      }
                    />
                  </Col>
                </Row>

                <FormGroup className="mt-3">
                  <Container className="text-center">
                    <p className="text-muted">Image Preview</p>
                    <img
                      className="image-fuild"
                      style={{
                        maxHeight: "250px",
                        border: "2px solid black",
                      }}
                      src={
                        imageUpdate.imagePreview
                          ? imageUpdate.imagePreview
                          : getProductImageUrl(updateProduct.productId)
                      }
                      alt=""
                    ></img>
                  </Container>
                  <Form.Label className="mt-3">Product Image</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={"file"}
                      onChange={(event) => handleFileChange(event)}
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Select onChange={(event)=>(
                      setCategoryChangeId(event.target.value)
                   )}>
                    <option value="none">None</option>
                    {categories ? (
                      <>
                        {categories.content.map((cat) => (
                          <option
                            selected={
                              cat.categoryId ==
                              updateProduct?.category?.categoryId
                            }
                            key={cat.categoryId}
                            value={cat.categoryId}
                          >
                            {cat.title}
                          </option>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </Form.Select>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdate}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateFromSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  return (
    <tr className={getBackgroundForProduct()}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>{product.discountedPrice}</td>
      <td>{product.live ? "YES" : "NO"}</td>
      <td>{product.stock ? "IN" : "OUT"}</td>
      <td>Mobile Phones</td>
      <td>{formatDate(product.addedDate)}</td>
      <td className={`d-flex ${getBackgroundForProduct()} table-light`}>
        {/* Edit Button */}
        <Button
          variant="warning"
          size="sm"
          onClick={(event) => {
            setUpdateProduct(product);
            setShowUpdate(true);
          }}
        >
          <FaEdit />
        </Button>
        {/* View Button */}
        <Button
          className="ms-2"
          variant="info"
          size="sm"
          onClick={(event) => {
            setSelectedProduct(product);
            setShow(true);
          }}
        >
          <AiFillEye />
        </Button>
        {/* Delete Button */}
        <Button
          className="ms-2"
          variant="danger"
          size="sm"
          onClick={(event) => {
            deleteProductLocal(product.productId);
          }}
        >
          <RiDeleteBin5Fill />
        </Button>
      </td>
      {viewProductModalView()}
      {openEditProductModal()}
    </tr>
  );
};

export default SingleProductView;
