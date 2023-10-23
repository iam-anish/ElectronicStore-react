import { useState } from "react";
import { Button, Card, Container,Spinner } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../services/category.service";

const AddCategory = () => {

    const [category,setCategory] = useState({
        title: '',
        description: '',
        coverImage: ''
    })

    const clearData = () => {
        setCategory({
            title: '',
            description: '',
            coverImage: ''
        })
    }

    const [loading,setLoading] = useState(false);

    const handleFieldChange = (event,property) => {
        event.preventDefault()
        setCategory({
            ...category,
            [property]: event.target.value
        })
    }

    const handleFromSubmit = (event) => {
        event.preventDefault()
        console.log(category)
        if(category.title === undefined || category.title.trim() === ''){
            toast.error("Category title is required !!")
            return
        }
        if(category.description === undefined || category.description.trim() === ''){
            toast.error("Category description is required !!")
            return
        }
        if(category.coverImage === undefined || category.coverImage.trim() === ''){
            toast.error("Category coverImage is required !!")
            return
        }

        //call server api to add category
        setLoading(true)
        addCategory(category).then((data)=>{
            console.log(data)
            toast.success("Category Added !!")
            clearData();
        }).catch((error)=>{
            console.log(error)
            toast.error("Error in adding category !!")
        }).finally(()=>{
            setLoading(false)
        })
    }

    return(
        <>
          <Container fluid>
            <Card className="border border-0 shadow">

                <Card.Body>
                     <h4>Add Category</h4>
                     <Form onSubmit={handleFromSubmit}>
                        <Form.Group className="mt-3">
                            <Form.Label>Category Title</Form.Label>
                            <Form.Control 
                                type="test" 
                                value={category.title}
                                placeholder="Enter here"
                                onChange={(event)=>handleFieldChange(event,'title')}
                                />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Category Description</Form.Label>
                            <Form.Control 
                                as={'textarea'} 
                                rows={4} 
                                placeholder="Enter here"
                                value={category.description}
                                onChange={(event)=>handleFieldChange(event,'description')}/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Category Cover Image Url</Form.Label>
                            <Form.Control 
                                type="test" 
                                placeholder="Enter here"
                                value={category.coverImage}
                                onChange={(event)=>handleFieldChange(event,'coverImage')}/>
                        </Form.Group>

                        <Container className="text-center mt-3"> 
                            <Button type="submit" variant="success" disabled={loading}>
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
                      <span hidden={loading}>Add Category</span>
                       </Button>
                            <Button onClick={clearData} variant="warning" className="ms-2 ps-4 pe-4">Clear</Button>
                        </Container>
                     </Form>
                </Card.Body>
            </Card>
          </Container>
        </>
    )
}

export default AddCategory;