use wasm_bindgen::prelude::*;

mod brightness;
mod grayscale;
mod contrast;
mod saturation;
mod exposure;
mod invert;
mod blur;
mod sharpen;
mod hue;
mod temperature;
mod tint;

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

#[wasm_bindgen]
pub fn sharpen(data: &mut [u8], width: usize, height: usize) { sharpen::sharpen(data, width, height) }

#[wasm_bindgen]
pub fn hue(data: &mut [u8], degrees: f32) { hue::hue(data, degrees) }

#[wasm_bindgen]
pub fn temperature(data: &mut [u8], temp: f32) { temperature::temperature(data, temp) }

#[wasm_bindgen]
pub fn tint(data: &mut [u8], tint: f32) { temperature::temperature(data, tint) }

