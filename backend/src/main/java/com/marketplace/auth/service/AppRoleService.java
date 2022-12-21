package com.marketplace.auth.service;

import com.marketplace.auth.model.AppRole;
import com.marketplace.auth.model.ERole;
import com.marketplace.auth.repository.RoleRepository;
import com.marketplace.backend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppRoleService {
    private final RoleRepository roleRepository;

    public AppRoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public AppRole getRoleBeName(ERole roleName){
        return roleRepository.getAppRoleByName(roleName)
                .orElseThrow(()->new ResourceNotFoundException("Не найдена роль с именем "+roleName.name()));
    }
}
