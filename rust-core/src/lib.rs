use wasm_bindgen::prelude::*;

mod brightness;
mod grayscale;
mod contrast;
mod saturation;
mod exposure;
mod invert;
mod blur;

#[wasm_bindgen]
pub fn grayscale(data: &mut [u8]) {
    grayscale::grayscale(data)
}

#[wasm_bindgen]
pub fn brightness(data: &mut [u8], value: f32) {
    brightness::brightness(data, value)
}

#[wasm_bindgen]
pub fn contrast(data: &mut [u8], value: f32) {
    contrast::contrast(data, value)
}

#[wasm_bindgen]
pub fn saturation(data: &mut [u8], value: f32) { saturation::saturation(data, value) }

#[wasm_bindgen]
pub fn exposure(data: &mut [u8], value: f32) { saturation::saturation(data, value) }

#[wasm_bindgen]
pub fn invert(data: &mut [u8]) { invert::invert(data) }

#[wasm_bindgen]
pub fn blur(data: &mut [u8], width: usize, height: usize) { blur::blur(data, width, height) }
