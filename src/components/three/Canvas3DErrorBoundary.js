"use client";

import { Component } from "react";

/** Swallows WebGL/three.js render failures so a broken GPU context never takes down the page. */
export default class Canvas3DErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("3D scene failed to render, hiding gracefully:", error);
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
