import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Container, FormGroup,Form,Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import CategoryView from "../../components/CategoryView";
import { deleteCategory, getCategories,updateCategory as updateCategoryAPI } from "../../services/category.service";
import InfiniteScroll from "react-infinite-scroll-component";

const ViewCategories = () => {
  const [categories, setCategories] = useState({
    content: [],
  });

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateCategory,setUpdateCategory] = useState(null);

  const [currentPage,setCurrentPage] = useState(0);

  //for modal view
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for modal update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const deleteCategoryMain = (categoryId) => {
    // alert(categoryId)
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
        deleteCategory(categoryId)
          .then((data) => {
            console.log(data);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            const newArray = categories.content.filter((c) => {
              return c.categoryId != categoryId;
            });

            setCategories({
              ...categories,
              content: newArray,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error while deleting category.");
          });
      }
    });
  };


  //initial page load
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories from server !!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //scroll page load
  useEffect(()=>{
      if(currentPage>0){
        getCategories(currentPage)
      .then((data) => {
        console.log(data);
        setCategories({
            content: [...categories.content,...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages
        })
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories from server !!");
      })
      }

  },[currentPage])

  // handle view button of category
  const handleView = (category) => {
    setSelectedCategory(category)
    setUpdateCategory(category)
    handleShow();
  };

  // handle update button of category
  const handleUpdate = (category) => {
    setSelectedCategory(category)
    setUpdateCategory(category)
    handleShowUpdate()
  };

  //load next page function
  const loadNextPage = () => {
    console.log("Loading next page")
    setCurrentPage(currentPage+1)
  }

  const updateFieldHandler = (event,property) => {
    setUpdateCategory({
       ...updateCategory,
       [property]: event.target.value
    })
  }

  const updateData = (event) => {  

    event.preventDefault();

     updateCategory.categoryId = selectedCategory.categoryId
     if(updateCategory.title===undefined || updateCategory.title.trim() === ''){
        toast.error("Title is requied !!")
        return
     }
     if(updateCategory.description===undefined || updateCategory.description.trim() === ''){
        toast.error("Description is requied !!")
        return
     }
     if(updateCategory.coverImage===undefined || updateCategory.coverImage.trim() === ''){
        toast.error("Cover Image is requied !!")
        return
     }

     setLoading(true)
     updateCategoryAPI(updateCategory).then(data=>{
        console.log(data)
        toast.success("Category Updated Successfully")

        //updating local categories
        const newCategories = categories.content.map(cat=>{
            if(cat.categoryId===selectedCategory.categoryId){
                cat.title = data.title
                cat.description = data.description
                cat.coverImage = data.coverImage
            }
            return cat;
        })

        setCategories({
            ...categories,
            content: newCategories
        })
        

     }).catch(error=>{
        console.log(error)
        toast.error("Error updating category")
     }).finally(()=>{
        setShowUpdate(false)
        setLoading(false)
     })
  }

  //modal: view and update
  const modalView = () => {
    return selectedCategory ? (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={selectedCategory.coverImage}
              />
            </Container>
            <span className="mt-5 justify-content-center">
              {selectedCategory.description}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    ) : (
      <h1></h1>
    );
  };

  //modal: update
  const modalUpdate = () => {
    return selectedCategory ? (
      <>
        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form>
                <FormGroup>
                    <Form.Label>Category Title</Form.Label>
                    <Form.Control 
                       type="text" 
                       placeholder="Enter here" 
                       value={updateCategory.title}
                       onChange={(event)=>updateFieldHandler(event,'title')}/>
                </FormGroup>

                <FormGroup className="mt-3">
                    <Form.Label>Category Description</Form.Label>
                    <Form.Control 
                       as={'textarea'}
                       placeholder="Enter here" 
                       value={updateCategory.description}
                       onChange={(event)=>updateFieldHandler(event,'description')}/>
                </FormGroup>

                <FormGroup className="mt-3">
                    <Form.Label>Category Cover Image</Form.Label>
                    <Form.Control 
                       type="text"
                       placeholder="Enter here" 
                       value={updateCategory.coverImage}
                       onChange={(event)=>updateFieldHandler(event,'coverImage')}/>
                </FormGroup>

            </Form>
           
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="primary" onClick={updateData} disabled={loading}>
            <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        className="me-2"
                        role="status"
                        aria-hidden="true"
                        hidden={!loading}
                      />
                      <span hidden={!loading}>Loading..</span>
                      <span hidden={loading}>Save Changes</span>  
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    ) : (
      <h1></h1>
    );
  };
 
  return (
    <>
      {categories.content.length > 0 ? (
        <>
          <InfiniteScroll
           dataLength={categories.content.length} //This is important field to render the next data
           next={loadNextPage}
           hasMore={!categories.lastPage}
           loader={<h2 className="text-center">Loading...</h2>}
           endMessage={
             <p style={{ textAlign: 'center' }}>
               <b>Yay! You have seen it all</b>
             </p>}
          >
          {categories.content.map((category) => {
            return (
              <CategoryView
                deleteCat={deleteCategoryMain}
                category={category}
                key={category.categoryId}
                viewCat={handleView}
                updateCat={handleUpdate}
              />
            );
          })}
          </InfiniteScroll>
        </>
      ) : (
        <h2 className="text-center">No Categories found</h2>
      )}
      {modalView()}
      {modalUpdate()}
    </>
  );
};

export default ViewCategories;
