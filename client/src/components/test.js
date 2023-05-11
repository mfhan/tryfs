const addMarkers = () => {
  if (map.current && map.current.loaded() && props.vendors.length > 0) {
    props.vendors.forEach((vendor) => {
      let marker = markersRef.current[vendor.id];
      if (!marker) {
        const el = document.createElement('div');
        el.className = 'marker';

        const popup = new mapboxgl.Popup().setHTML(
          `<h3>${vendor.username}</h3><p>${vendor.website}</p>`
        );

        marker = new mapboxgl.Marker({
          element: el,
          draggable: true
        })
          .setLngLat([vendor.long, vendor.lat])
          .setPopup(popup)
          .addTo(map.current);

        markersRef.current[vendor.id] = marker;
      } else {
        marker.setLngLat([vendor.long, vendor.lat]);
      }

      function onDragEnd() {
        const lngLat = marker.getLngLat();

        const updatedVendor = {
          ...vendor,
          long: lngLat.lng,
          lat: lngLat.lat
        };

        props.vendorSetter((prevVendors) => {
          // Remove the old vendor from the vendors array
          const vendors = prevVendors.filter((v) => v.id !== updatedVendor.id);
          // Add the updated vendor to the vendors array
          vendors.push(updatedVendor);
          return vendors;
        });

        setCurrentVendor(updatedVendor);
      }

      marker.on('dragend', onDragEnd);
    });
  }
};
