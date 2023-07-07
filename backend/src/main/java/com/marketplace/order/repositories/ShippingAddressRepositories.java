package com.marketplace.order.repositories;

import com.marketplace.order.models.ShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingAddressRepositories extends JpaRepository<ShippingAddress, Long> {
}
