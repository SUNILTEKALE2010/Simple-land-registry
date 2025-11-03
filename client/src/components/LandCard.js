import React from "react";

export default function LandCard({ land }) {
  if (!land) return null;
  return (
    <div className="card">
      <div className="card-row">
        <h3 style={{ margin: 0 }}>{land.landId}</h3>
        <span className="badge">{land.isRegistered ? "Registered" : "Unregistered"}</span>
      </div>
      <p style={{ margin: "8px 0" }}><strong>Owner:</strong> {land.ownerName}</p>
      <p style={{ margin: "6px 0" }}><strong>Contact:</strong> {land.ownerContact}</p>
      <p className="mono" style={{ marginTop: 8 }}><strong>Wallet:</strong> {land.ownerAddress}</p>
    </div>
  );
}
