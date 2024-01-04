import { Route, Routes } from "react-router-dom"
import LayoutUser from "./layout/User"
import Home from "./pages/User/Home"
import Post from "./pages/User/Post"
import Author from "./pages/User/Author"
import LayoutAdmin from "./layout/Admin"
import Dashboard from "./pages/Admin/Dashboard"
import PostAdmin from "./pages/Admin/Post"
import Login from "./pages/Login"
import Editor from "./pages/Admin/Editor"
import CreatePost from "./pages/Admin/Post/create"
import Category from "./pages/Admin/Category"
import EditPost from "./pages/Admin/Post/edit"

function App() {

  return (
    <Routes>
      <Route element={<LayoutUser />}>
        <Route path="/" element={<Home />}/>
        <Route path="/post/:id" element={<Post />} />
        <Route path="/auteur" element={<Author />} />
      </Route>
      <Route element={<LayoutAdmin />}>
        <Route path="/admin" element={<Dashboard />}/>
        <Route path="/admin/post" element={<PostAdmin />}/>
        <Route path="/admin/post/new" element={<CreatePost />}/>
        <Route path="/admin/post/edit/:id" element={<EditPost />}/>
        <Route path="/admin/editor" element={<Editor />}/>
        <Route path="/admin/category" element={<Category />}/>
      </Route>
      <Route path="/login" element={<Login />}/>
    </Routes>
  )
}

export default App
