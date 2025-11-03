import React, { useEffect, useState } from "react";

export default function TransferModal({ open, onClose, onTransfer, landId }) {
  const [transferLandId, setTransferLandId] = useState("");
  const [newOwnerAddr, setNewOwnerAddr] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newOwnerContact, setNewOwnerContact] = useState("");

  useEffect(() => {
    if (open) {
      setTransferLandId(landId || "");
      setNewOwnerAddr("");
      setNewOwnerName("");
      setNewOwnerContact("");
    }
  }, [open, landId]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Transfer Ownership</h2>

        <div className="label">Land ID</div>
        <input
          value={transferLandId}
          readOnly
          style={{ backgroundColor: "#2d3a5a", color: "#fff" }}
        />

        <div className="label">New Owner Wallet Address</div>
        <input
          value={newOwnerAddr}
          onChange={(e) => setNewOwnerAddr(e.target.value)}
          placeholder="0x..."
        />

        <div className="label">New Owner Name</div>
        <input
          value={newOwnerName}
          onChange={(e) => setNewOwnerName(e.target.value)}
          placeholder="Full name"
        />

        <div className="label">New Owner Contact</div>
        <input
          value={newOwnerContact}
          onChange={(e) => setNewOwnerContact(e.target.value)}
          placeholder="Phone or email"
        />

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn primary"
            onClick={() =>
              onTransfer(transferLandId, newOwnerAddr, newOwnerName, newOwnerContact)
            }
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
