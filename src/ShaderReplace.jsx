// Isolated replace shader


 export const onBeforeCompile = (shader) => 
 {
 shader.uniforms.uTime = customUniforms.uTime

 shader.vertexShader = shader.vertexShader.replace(
     '#include <common>',
     `
         #include <common>

         uniform float uTime;

         mat2 get2dRotateMatrix(float _angle)
         {
             return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
         }
     `
     )

 shader.vertexShader = shader.vertexShader.replace(
         '#include <beginnormal_vertex>',
         `
             #include <beginnormal_vertex>
 
             float angle = sin(position.y + uTime) * 0.2;
             mat2 rotateMatrix = get2dRotateMatrix(angle);
 
             objectNormal.xz = rotateMatrix * objectNormal.xz;
         `
     )

   shader.vertexShader = shader.vertexShader.replace(
     '#include <begin_vertex>',
     `
         #include <begin_vertex>

         transformed.xz = rotateMatrix * transformed.xz;
     `
  )
 }