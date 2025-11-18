use wasm_bindgen::prelude::*;

mod brightness;
mod grayscale;
mod contrast;

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
