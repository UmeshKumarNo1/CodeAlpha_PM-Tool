import React from 'react';

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>About PM Tool</h2>

        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">Our Mission</div>
          <div className="card-body">
            <p>
              PM Tool is designed to help teams organize, track, and collaborate on projects efficiently. 
              We believe that effective project management should be simple, intuitive, and accessible to everyone.
            </p>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <div className="card-header">🎯 Our Vision</div>
            <div className="card-body">
              To become the leading project management platform that empowers teams to achieve their goals through better collaboration and organization.
            </div>
          </div>

          <div className="card">
            <div className="card-header">💡 Our Values</div>
            <div className="card-body">
              <ul style={{ paddingLeft: '20px' }}>
                <li>Simplicity and ease of use</li>
                <li>Transparency and trust</li>
                <li>Innovation and continuous improvement</li>
                <li>Customer-centric approach</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">🚀 Key Features</div>
            <div className="card-body">
              <ul style={{ paddingLeft: '20px' }}>
                <li>Project Management</li>
                <li>Task Tracking</li>
                <li>Team Collaboration</li>
                <li>Real-time Updates</li>
                <li>Analytics & Reporting</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <div className="card-header">Technology Stack</div>
          <div className="card-body">
            <p><strong>Frontend:</strong> React.js, React Router, Socket.io Client</p>
            <p><strong>Backend:</strong> Node.js, Express.js, MongoDB</p>
            <p><strong>Real-time Communication:</strong> Socket.io</p>
            <p><strong>Authentication:</strong> JWT (JSON Web Tokens)</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <div className="card-header">Contact Us</div>
          <div className="card-body">
            <p><strong>Email:</strong> support@pmtool.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
            <p><strong>Website:</strong> www.pmtool.com</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <div className="card-header">FAQ</div>
          <div className="card-body">
            <p><strong>Q: Is PM Tool free?</strong></p>
            <p>A: We offer a free tier with basic features and premium plans for advanced functionality.</p>
            
            <p style={{ marginTop: '12px' }}><strong>Q: Can I invite team members?</strong></p>
            <p>A: Yes! You can invite unlimited team members to collaborate on projects.</p>
            
            <p style={{ marginTop: '12px' }}><strong>Q: Is my data secure?</strong></p>
            <p>A: We use industry-standard encryption and security practices to protect your data.</p>
            
            <p style={{ marginTop: '12px' }}><strong>Q: Do you offer API access?</strong></p>
            <p>A: Yes, we provide a comprehensive REST API for integrations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

