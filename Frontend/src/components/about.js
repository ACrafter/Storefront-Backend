import React,{Fragment,useState} from 'react'
import "./About.css"

const About = () => {
  const [ toggleTab, setToggleTab] = useState(1)
  const toggleState = (index) =>{
    setToggleTab(index)
  }
  return (
    <Fragment>

    <section className="about">

    <div className="row">

    <div className="column">
    </div>

    <div className="column">

    <div className="tabs">

    <div className={toggleTab === 1 ? "single-tab active-tab": "single-tab"}
    onClick = {() => toggleState(1)}
    >
      <h2>About US</h2>
    </div>

    <div className={toggleTab === 2 ? "single-tab active-tab": "single-tab"}
    onClick = {() => toggleState(2)}
    >
      
    </div>
      
    </div>

    <div className="tab-content">

    {/* About Content */}

    <div className={toggleTab === 1 ?"content active-content":"content"}>
      <h2>About Us</h2>
      <p>Welcome to Toy Story Toys, the premier destination for all your toy needs!</p>
<p>Our mission is simple: to bring joy and imagination to children of all ages through the magic of play. From dolls and action figures to board games and outdoor equipment, we have something for every interest and age group.</p>

<p>Toy Story Toys has been a beloved part of the community for over 20 years. We first opened our doors in 2001, and since then, we've become a go-to destination for families looking for the best in children's entertainment.</p>

<p>In addition to our wide selection of toys, we also offer a number of unique services and features. Our in-store demonstrations give kids the chance to try out toys before they buy, and our birthday party packages make it easy to celebrate in style. Plus, our loyalty program rewards our most dedicated customers with special discounts and perks.</p>

<p>Above all, we are committed to providing the best possible customer experience. From our friendly and knowledgeable staff to our commitment to safety and quality, we strive to go above and beyond for our valued customers.</p>

<p>Thank you for choosing Toy Story Toys. We can't wait to see the smiles on your little ones' faces!</p>
    </div>

        
    </div>

    </div>

    </div>

    </section>
    
    </Fragment>
  )
}

export default About